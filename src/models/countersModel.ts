import { ICounters } from "../types/countersType";
import { model, Schema } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;
const countersSchema: Schema = new Schema({
  // _id: { type: typeof ObjectId, required: true },
  userCount: { type: Number, required: true },
  itemCount: { type: Number, required: true },
});

export const Counters = model<ICounters>("Counters", countersSchema);
