import { RequestHandler, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export interface CustomRequest extends Request {
  user?: any;
}

export const protect: RequestHandler = async (req: CustomRequest, res, next) => {
  let token: string;

  token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token!");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    req.user = await User.findById(decodedToken.userId).select("-password");

    return next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed!");
  }
};

export const admin: RequestHandler = async (req: CustomRequest, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401);
    throw new Error("Not authorized as admin!");
  }

  return next();
};
