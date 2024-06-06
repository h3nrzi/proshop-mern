import { RequestHandler } from "express";
import { LoginDto } from "../Dto/user";
import User from "../models/user";
import jwt from "jsonwebtoken";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as LoginDto;

  const user = await User.findOne({ email });

  const validPassword = await user?.matchPassword(password);

  if (!user || !validPassword) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  // Set JWT as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

// @desc    Register user
// @route   POST /api/users
// @access  Public
export const register: RequestHandler = async (req, res, next) => {
  res.send("register user");
};

// @desc    Logout user (clear cookie)
// @route   POST /api/users/logout
// @access  Private
export const logout: RequestHandler = async (req, res, next) => {
  res.send("logout user");
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile: RequestHandler = async (req, res, next) => {
  res.send("get profile");
};

// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
export const updateProfile: RequestHandler = async (req, res, next) => {
  res.send("update profile");
};

// @desc    Get users
// @route   GET /api/users
// @access  Private -> Admin
export const getAll: RequestHandler = async (req, res, next) => {
  res.send("get all users");
};

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private -> Admin
export const getOne: RequestHandler = async (req, res, next) => {
  res.send("get user");
};

// @desc    Update user
// @route   PATCH /api/users/:id
// @access  Private -> Admin
export const update: RequestHandler = async (req, res, next) => {
  res.send("update user");
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private -> Admin
export const remove: RequestHandler = async (req, res, next) => {
  res.send("delete user");
};
