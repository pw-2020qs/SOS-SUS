import { AddressComponent, AddressType, LocationType, StatusValue } from "./GeocodingTypes"

type Result = {
  address_components: AddressComponent[]
  formatted_address: String 
  geometry: {
    location: {
      lat: Number
      lng: Number
    }
    location_type: LocationType
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
  types: AddressType[]
}

export type ReverseGeocodingResponse = {
  plus_code: {
    compound_code: String
    global_code: String
  }
  results: Result[]
  status: StatusValue
}
