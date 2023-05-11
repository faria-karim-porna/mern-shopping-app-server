import { Document } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;
export interface IUsers extends Document {
  // _id: typeof ObjectId;
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  createdBy: string;
  accessType: string;
}
