import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes";
import connection from "./connection";
// import MongoClient from "mongodb".MongoClient;

dotenv.config();

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qs1yz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(router);

const port = 5000;

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

connection();

app.listen(process.env.PORT || port);
