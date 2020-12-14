import { Request, Response } from "express";
import * as GoogleMapsService from "../services/GoogleMapsService";
import * as DataSusService from "../services/DataSusService";
import * as HospitalOccupancyService from "../services/HospitalOccupancyService";
import { FilledHospitalOccupancy, HospitalOccupancy } from "../commons/DataSusResponse";
import { hospitalList } from '../constants/hospitalList';

export const healthCheck = (req: Request, res: Response) => {
  res.send('Hello World!').status(200);
}

export const test = (req: Request, res: Response) => {
  console.log(`lat: ${req.query.lat} long: ${req.query.long}`);
  res.send(hospitalList).status(200);
}

export const getCensList = async (req: Request, res: Response) => {
  const lat = req.query.lat as String;
  const long = req.query.long as String;

  console.log(`Receiving Request to lat: ${lat} and long: ${long}`);

  if (!lat || !long) {
    return res.send("Invalid Query Params").status(400);
  }

  try {
    const requestAddress = await GoogleMapsService.getAddressByLatLong(lat, long);

    console.log(`Requested Address from google: ${JSON.stringify(requestAddress.results[0].formatted_address)}`);

    const requestCity = requestAddress.results[0].address_components.find(
      (component) => component.types.includes("administrative_area_level_2")
    );

    const requestState = requestAddress.results[0].address_components.find(
      (component) => component.types.includes("administrative_area_level_1")
    );

    if (!requestCity || !requestState) {
      return res.send("City or State Not Found").status(400);
    }

    const city = requestCity.long_name;
    const state = requestState.long_name;
    const stateInitials = requestState.short_name;

    console.log(`Request city: ${city}, state: ${state} and state initials: ${stateInitials}`);

    const cnesListResponse = await DataSusService.getCnes(state, stateInitials, city);

    const rawHospitalOccupancyList = cnesListResponse.hits.hits
      .reduce<HospitalOccupancy[]>(
        (acc, cur) => {
          acc.push(cur._source);
          return acc;
        },
        []
      )
      .filter((occupancy) => occupancy.municipio === city);

    console.log(`Raw Occupancy List: length ${rawHospitalOccupancyList.length} and example:`,
      rawHospitalOccupancyList[0]);

    const hospitalOccupancyListWithLatLong = 
      (await HospitalOccupancyService.fillLatLongToHospitalOccupancy(rawHospitalOccupancyList))
      .filter((occupancy) => occupancy.lat !== undefined);

    console.log(
      `Occupancy List with Lat and Long filled: length ${hospitalOccupancyListWithLatLong.length} and example:`,
      hospitalOccupancyListWithLatLong[0]
    );
    
    const hospitalOccupancyListWithScore =
      (await HospitalOccupancyService.calculateHospitalsScore(lat, long, hospitalOccupancyListWithLatLong))
      .filter((occupancy) => occupancy.score !== undefined) as FilledHospitalOccupancy[];

    console.log(`Occupancy List with Score filled: length ${hospitalOccupancyListWithScore.length} and example`,
      hospitalOccupancyListWithScore[0]);

    const orderedHospitalOccupancyList = 
      hospitalOccupancyListWithScore.sort((a, b) => b.score.valueOf() - a.score.valueOf());

    console.log(`Ordered Occupancy List: length ${orderedHospitalOccupancyList.length} and example`,
      orderedHospitalOccupancyList[0]);

    return res.send(orderedHospitalOccupancyList).status(200);
  } catch (err) {
    return res.send(err).status(500);
  }
}
