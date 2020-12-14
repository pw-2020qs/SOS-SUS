import { Document, Schema, model } from "mongoose";

const CnesSchema: Schema = new Schema({
  _id: String,
  name: String,
  lat: String,
  long: String,
  address: String,
  addressNumber: String,
  neighbourhood: String,
  apartamentNumber: String,
  postalCode: String,
  workingHoursInit: String,
  workingHoursEnd: String,
  workingHoursModel: String,
  deactivationReason: String,
});

export interface ICnes {
  _id: any
  name: String
  lat: String
  long: String
  address: String
  addressNumber: String
  neighbourhood: String
  apartamentNumber: String
  postalCode: String
  workingHoursInit: String
  workingHoursEnd: String
  workingHoursModel: String
  deactivationReason: String
}

export interface ICnesDocument extends ICnes, Document {}

const CnesModel = model<ICnesDocument>("cnes", CnesSchema);

export default CnesModel
