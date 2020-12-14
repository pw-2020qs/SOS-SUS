import { AddressGeocodingResponse } from "../commons/AddressGeocodingResponse";
import { DistanceMatrixResponse } from "../commons/DistanceMatrixResponse";
import { ReverseGeocodingResponse } from "../commons/ReverseGeocodingResponse";

const googleGeocodeApiUrl = "https://maps.googleapis.com/maps/api/geocode/json";
const googleDistanceMatrixApiUrl = "https://maps.googleapis.com/maps/api/distancematrix/json";

export async function getAddressByLatLong(lat: String, long: String): Promise<ReverseGeocodingResponse> {
  console.log('Requesting Address from google for:', lat, long);
  return fetch(buildFetchAddressByLatLongUrl(lat, long)) 
    .then(res => res.json())
    .catch((err) => {
      throw err;
    });
}

export async function getLatLongByAddress(addressNumber: String, address: String): Promise<AddressGeocodingResponse> {
  console.log('Requesting Lat Long from google for:', address, addressNumber);
  return fetch(buildFetchLatLongByAddressUrl(addressNumber, address))
    .then(res => res.json())
    .catch((err) => {
      throw err;
    });
}

export async function getDistanceBetweenPoints(
  originLat: String,
  originLong: String,
  destinationLat: String,
  destinationLong: String
): Promise<DistanceMatrixResponse> {
  console.log('Requesting Distance Between Point from google for:',
    originLat, originLong, destinationLat, destinationLong
  );
  return fetch(buildGetDistanceBetweenPointsUrl(originLat, originLong, destinationLat, destinationLong))
    .then(res => res.json())
    .catch((err) => {
      throw err;
    });
}

function buildFetchLatLongByAddressUrl(addressNumber: String, rawAddress: String): string {
  const address = rawAddress.replace('AVN ', 'avenida ').replace('ALA ', 'alameda ').replace('TRAV ', 'travessa ')
    .replace(/\s/g, '+');
  
  return googleGeocodeApiUrl.concat(
    `?components=country:BR&address=${addressNumber}+${address}&key=${process.env.REACT_APP_API_KEY}`
  );
}

function buildFetchAddressByLatLongUrl(lat: String, long: String): string {
  return googleGeocodeApiUrl.concat(
    `?latlng=${lat},${long}&location_type=ROOFTOP&result_type=street_address&key=${process.env.REACT_APP_API_KEY}`
  );
}

function buildGetDistanceBetweenPointsUrl(
  originLat: String,
  originLong: String,
  destinationLat: String,
  destinationLong: String
) {
  return googleDistanceMatrixApiUrl.concat(
    `?origins=${originLat},${originLong}&destinations=${destinationLat},${destinationLong}` + 
    `&mode=walking&key=${process.env.REACT_APP_API_KEY}`
  );
}