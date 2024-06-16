import path from "path";
import express, { Express } from "express";
import morgan from "morgan";
// import cors from "cors";
import cookieParser from "cookie-parser";

module.exports = (app: Express) => {
  // Body Parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Cookie parser
  app.use(cookieParser());

  // Logging Request
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

  // CORS Origin Request
  // app.use(cors());

  // Serve Images
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/uploads")));
};
