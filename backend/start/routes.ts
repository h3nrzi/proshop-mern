import { Express } from "express";
import productRoutes from "../routes/products";
import userRoutes from "../routes/users";
import globalErrorHandler from "../middlewares/globalErrorHandler";
import notFound from "../middlewares/notFound";

module.exports = (app: Express) => {
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("*", notFound);

  app.use(globalErrorHandler);
};
