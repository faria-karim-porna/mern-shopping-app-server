import { IMovies, ISeatArrangement } from "../types/moviesType";
import { model, Schema } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;

const moviesSchema: Schema = new Schema({
  // _id: { type: typeof ObjectId, required: true },
  id: { type: Number, required: true },
  movie: { type: String, required: true },
  movieDescription: { type: String, required: true },
  image: { type: String, required: true },
  timeAndDate: { type: String, required: true },
  seatsArrangement: { type: Array<ISeatArrangement>, required: true },
});

export const Movies = model<IMovies>('Movies', moviesSchema);
