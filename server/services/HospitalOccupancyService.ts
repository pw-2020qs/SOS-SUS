import { HospitalOccupancy } from "../commons/DataSusResponse";
import * as GoogleMapsService from "./GoogleMapsService";
import CnesModel from "../models/CnesModel";

export async function fillLatLongToHospitalOccupancy(
  hospitalOccupancyList: HospitalOccupancy[],
): Promise<HospitalOccupancy[]> {
  const filledHospitalOccupancyList = hospitalOccupancyList.map(
    async (occupancy) => {
      const cnesId = occupancy.cnes;
      const cnesDocument = await CnesModel.findById(cnesId);

      if (!cnesDocument) {
        console.log(`Document not found for CNES ${cnesId}`);
        return occupancy;
      }

      const googleResponse = await GoogleMapsService.getLatLongByAddress(
        cnesDocument.addressNumber,
        cnesDocument.address,
      );

      const result = googleResponse.results.find((result) => {
        const cityResponse = result.address_components.find((component) =>
          component.types.includes("administrative_area_level_2")
        )
        return cityResponse?.long_name === occupancy.municipio;
      });

      if (!result) {
        console.log(`Address not found for CNES ${cnesId}`);
        return occupancy;
      }    

      occupancy.formattedAddress = result.formatted_address;
      occupancy.lat = result.geometry.location.lat.toString();
      occupancy.long = result.geometry.location.lng.toString();

      return occupancy;
    }
  )

  return Promise.all(filledHospitalOccupancyList);
}

export async function calculateHospitalsScore(
  lat: String,
  long: String,
  hospitalOccupancyList: HospitalOccupancy[]
): Promise<HospitalOccupancy[]> {
  
  const filledHospitalOccupancyList = hospitalOccupancyList.map(
    async (occupancy) => {

      if (!occupancy.lat || !occupancy.long) {
        console.error('Empty Origin Lat/Long');
        return occupancy;
      }

      const googleResponse = await GoogleMapsService.getDistanceBetweenPoints(
        lat,
        long,
        occupancy.lat,
        occupancy.long
      );

      const UtiVacancies = occupancy.ofertaSRAGUti.valueOf() - occupancy.ocupSRAGUti.valueOf();
      const ClinicalVacancies = occupancy.ofertaSRAGCli.valueOf() - occupancy.ocupSRAGCli.valueOf();
      const distanceInMeters = googleResponse.rows[0].elements[0].distance.value.valueOf();
      const distance = distanceInMeters / 1000;

      const calculatedScore = 2 * UtiVacancies * ClinicalVacancies * (1/distance);

      const score = calculatedScore === -0 ? 0 : calculatedScore;

      occupancy.score = score;

      return occupancy;
    }
  )

  return Promise.all(filledHospitalOccupancyList);
}
