import { Document } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;

export interface IUsers extends Document {
  // _id: typeof ObjectId;
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  createdBy: string;
  accessType: string;
  creatorId: number;
}
