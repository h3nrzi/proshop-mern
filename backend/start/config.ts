import { Express } from "express";
import cors from "cors";

module.exports = (app: Express) => {
  app.use(cors());
};
