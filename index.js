import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import namazRoute from "./routes/namaz.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/namaz", namazRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
