import { IUsers } from "../types/usersType";
import { model, Schema } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;
const usersSchema: Schema = new Schema({
  // _id: { type: typeof ObjectId, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
  createdBy: { type: String, required: true },
  accessType: { type: String, required: true },
});

export const Users = model<IUsers>("Users", usersSchema);
