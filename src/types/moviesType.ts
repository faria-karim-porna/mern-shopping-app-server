import { Document } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;

export interface ISeatArrangement {
  sid: string;
  status: string;
  backgroundColor: string;
  color: string;
}

export interface IMovies extends Document {
  // _id: typeof ObjectId;
  id: number;
  movie: string;
  movieDescription: string;
  image: string;
  timeAndDate: string;
  seatsArrangement: ISeatArrangement[];
}
