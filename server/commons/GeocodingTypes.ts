export type AddressComponent = {
  long_name: String
  short_name: String
  types: AddressType[]
}

export type AddressType = "street_address" | "route" | "intersection" | "political" | "country"
  | "administrative_area_level_1" | "administrative_area_level_2" | "administrative_area_level_3"
  | "administrative_area_level_4" | "administrative_area_level_5" | "colloquial_area" | "locality" | "sublocality"
  | "neighborhood" | "premise" | "subpremise" | "plus_code" | "postal_code" | "natural_feature" | "airport" | "park"
  | "point_of_interest" | "floor" | "establishment" | "landmark" | "point_of_interest" | "parking" | "post_box"
  | "postal_town" | "room" | "street_number" | "bus_station" | "train_station" | "transit_station"

export type LocationType = "ROOFTOP" | "RANGE_INTERPOLATED" | "GEOMETRIC_CENTER" | "APPROXIMATE"

export type StatusValue = "OK" | "ZERO_RESULTS" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "INVALID_REQUEST"
  | "UNKNOWN_ERROR" | "MAX_ELEMENTS_EXCEEDED" | "MAX_DIMENSIONS_EXCEEDED" | "OVER_DAILY_LIMIT"
