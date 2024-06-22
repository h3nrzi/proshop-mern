import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let NODE_ENV = process.env.NODE_ENV;
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose objectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resourse not Found`;
    statusCode = 404;
  }

  return res.status(statusCode).json({
    message,
    stack: NODE_ENV === "production" ? "😬😬😬" : err.stack,
  });
};

export default globalErrorHandler;
