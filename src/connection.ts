import { ServerApiVersion } from "mongodb";
import mongoose, { ConnectOptions } from "mongoose";
const connection = async () => {
  const DB_NAME = "shoppingApp";
  const DB_USER = "shoppingAppAdmin";
  const DB_PASS = "osRqWSTk3crs3x8V";
  const uri = `mongodb://${DB_USER}:${DB_PASS}@cluster0-shard-00-00.qs1yz.mongodb.net:27017,cluster0-shard-00-01.qs1yz.mongodb.net:27017,cluster0-shard-00-02.qs1yz.mongodb.net:27017/${DB_NAME}?ssl=true&replicaSet=atlas-6yqhwu-shard-0&authSource=admin&retryWrites=true&w=majority`;
  //   const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qs1yz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  //   const options = { useNewUrlParser: true, useUnifiedTopology: true };
  const options = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };
  // mongoose.set("useFindAndModify", false);
  try {
    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database", error);
  }
};

export default connection;
