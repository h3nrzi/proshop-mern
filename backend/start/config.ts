import { Express } from "express";
import morgan from "morgan";
import cors from "cors";

module.exports = (app: Express) => {
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
  app.use(cors());
};
