import { IItems } from "../types/itemsType";
import { model, Schema } from "mongoose";

const itemsSchema: Schema = new Schema({
  // _id: { type: typeof ObjectId, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  createdAt: { type: String, required: true },
  createdBy: { type: String, required: true },
  creatorId: { type: Number, required: true },
});

export const Item = model<IItems>("Item", itemsSchema);
