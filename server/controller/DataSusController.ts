import { Request, Response } from "express";
import * as GoogleMapsService from "../services/GoogleMapsService";
import * as DataSusService from "../services/DataSusService";
import * as HospitalOccupancyService from "../services/HospitalOccupancyService";
import { FilledHospitalOccupancy, HospitalOccupancy } from "../commons/DataSusResponse";

export const healthCheck = (req: Request, res: Response) => {
  res.send('Hello World!').status(200);
}

export const getCensList = async (req: Request, res: Response) => {
  const lat = req.query.lat as String;
  const long = req.query.long as String;

  if (!lat || !long) {
    return res.send("Invalid Query Params").status(400);
  }

  try {
    const requestAddress = await GoogleMapsService.getAddressByLatLong(lat, long);

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

    const hospitalOccupancyListWithLatLong = 
      (await HospitalOccupancyService.fillLatLongToHospitalOccupancy(rawHospitalOccupancyList))
      .filter((occupancy) => occupancy.lat !== undefined);
    
    const hospitalOccupancyListWithScore =
      (await HospitalOccupancyService.calculateHospitalsScore(lat, long, hospitalOccupancyListWithLatLong))
      .filter((occupancy) => occupancy.score !== undefined) as FilledHospitalOccupancy[];

    const orderedHospitalOccupancyList = 
      hospitalOccupancyListWithScore.sort((a, b) => b.score.valueOf() - a.score.valueOf());

    return res.send(orderedHospitalOccupancyList).status(200);
  } catch (err) {
    return res.send(err).status(500);
  }
}
