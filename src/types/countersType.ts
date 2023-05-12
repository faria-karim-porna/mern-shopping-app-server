import { Document } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;

export interface ICounters extends Document {
  // _id: typeof ObjectId;
  userCount: number;
  itemCount: number;
}
