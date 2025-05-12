import * as dotenv from "dotenv";
dotenv.config();
const mongoose = require("mongoose");

const connection = async () => {
  try {
    const db = await mongoose.connect(
      process.env.MONGO_URL
    );

    console.log(
      `✅ MongoDB Connected: ${db.connection.host}/${db.connection.name}`
    );

    console.log("Connection established successfully.");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed!");
    console.error(`Error: ${error}`);
   
  }
};

export default connection;
