import express, { Express } from "express";
import globalErrorHandler from "../controllers/globalErrorHandler";
import notFound from "../middlewares/notFound";
import productRoutes from "../routes/products";
import userRoutes from "../routes/users";
import orderRoutes from "../routes/orders";
import uploadRoutes from "../routes/uploads";
import path from "path";

module.exports = (app: Express) => {
  const { NODE_ENV, PAYPAL_CLIENT_ID } = process.env;
  const rootDir = path.resolve();

  app.get("/api/config/paypal", (req, res) => res.send({ clientId: PAYPAL_CLIENT_ID }));
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/upload", uploadRoutes);

  app.use("/uploads", express.static(path.join(rootDir, "/uploads")));

  if (NODE_ENV === "production") {
    app.use(express.static(path.join(rootDir, "/frontend/dist")));
    app.get("*", (req, res) => res.sendFile(path.join(rootDir, "/frontend/dist/index.html")));
  } else {
    app.get("/", (req, res) => res.send("API is running..."));
  }

  app.use("*", notFound);
  app.use(globalErrorHandler);
};
