import { AddressComponent, AddressType, LocationType, StatusValue } from "./GeocodingTypes";

type Result = {
  address_components: AddressComponent[]
  formatted_address: String
  geometry: {
    location: {
      lat: Number
      lng: Number
    },
    location_type: LocationType
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
  types: AddressType[]
}

export type AddressGeocodingResponse = {
  results: Result[]
  status: StatusValue
}
