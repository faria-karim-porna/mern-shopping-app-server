import { IUsers } from "../types/usersType";
import { model, Schema } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;
const usersSchema: Schema = new Schema({
  // _id: { type: typeof ObjectId, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: false },
  createdAt: { type: String, required: true },
  createdBy: { type: String, required: true },
  accessType: { type: String, required: true },
  creatorId: { type: Number, required: true },
});

export const Users = model<IUsers>("Users", usersSchema);
