import { AddressComponents, AddressTypes, LocationTypes, StatusValues } from "./GeocodingTypes"

type Results = {
  address_components: AddressComponents[]
  formatted_address: String 
  geometry: {
    location: {
      lat: Number
      lng: Number
    }
    location_type: LocationTypes
    viewport: {
      northeast: {
        lat: Number
        lng: Number
      }
      southwest: {
        lat: Number
        lng: Number
      }
    }
  }
  place_id: String
  plus_code: {
    compound_code: String
    global_code: String
  }
  types: AddressTypes[]
}

export type ReverseGeocodingResponse = {
  plus_code: {
    compound_code: String
    global_code: String
  }
  results: Results[]
  status: StatusValues
}
