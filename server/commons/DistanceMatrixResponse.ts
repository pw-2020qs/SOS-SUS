import { StatusValue } from "./GeocodingTypes";

type Element = {
  distance: {
    text: String
    value: Number
  }
  duration: {
    text: String
    value: Number
  }
  status: StatusValue
}

type Row = {
  elements: Element[]
}

export type DistanceMatrixResponse = {
  destination_addresses: String[]
  origin_addresses: String[]
  rows: Row[]
  status: StatusValue
}
