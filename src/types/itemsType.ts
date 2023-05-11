import { Document } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;
export interface IItems extends Document {
  // _id: typeof ObjectId;
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  createdAt: string;
  createdBy: string;
  creatorId: number;
}
