import { Express } from "express";
import productRoutes from "../routes/products";

module.exports = (app: Express) => {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });

  app.use("/api/products", productRoutes);
};
