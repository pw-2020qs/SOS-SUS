import { AddressComponents, AddressTypes, LocationTypes, StatusValues } from "./GeocodingTypes";

type Results = {
  address_components: AddressComponents[]
  formatted_address: String
  geometry: {
    location: {
      lat: Number
      lng: Number
    },
    location_type: LocationTypes
    viewport: {
      northeast: {
        lat: Number
        lng: Number
      },
      southwest: {
        lat: Number
        lng: Number
      }
    }
  },
  place_id: String
  types: AddressTypes[]
}

export type AddressGeocodingResponse = {
  results: Results[]
  status: StatusValues
}