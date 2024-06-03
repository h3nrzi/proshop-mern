import { RequestHandler } from "express";

const asyncHandler = (fn: Function): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
