// const express = require("express");
// const cors = require("cors");
// we've change the type to module so importing module as we doing in frontend

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// const connectDB = require("./config/db");
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next();
});

app.use(
  cors({
    origin:[ process.env.FRONTEND_URL],
    methods:["POST","GET","DELETE","PUT","PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
// we limit it to 50 mb becz while uploading the image while signing up it was creating an issue
app.use("/api", router);

const PORT = 8080 || process.env.PORT;


connectDB()?.then(() => {
  app.listen(PORT, () => {
   
    console.log("Connected to DB");
    console.log("Server is running");
  });
});
// means if the connection to db is success then only the server will be connected
