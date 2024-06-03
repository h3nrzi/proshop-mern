import { Express } from "express";
import productRoutes from "../routes/products";
import globalErrorHandler from "../middlewares/globalErrorHandler";
import notFound from "../middlewares/notFound";

module.exports = (app: Express) => {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });

  app.use("/api/products", productRoutes);
  app.use("*", notFound);

  app.use(globalErrorHandler);
};
