import { Express } from "express";
import globalErrorHandler from "../middlewares/globalErrorHandler";
import notFound from "../middlewares/notFound";
import productRoutes from "../routes/products";
import userRoutes from "../routes/users";
import orderRoutes from "../routes/orders";
import uploadRoutes from "../routes/uploads";

module.exports = (app: Express) => {
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);

  app.use("/api/upload", uploadRoutes);

  app.get("/api/config/paypal", (req, res) => {
    return res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
  });

  app.use("*", notFound);
  app.use(globalErrorHandler);
};
