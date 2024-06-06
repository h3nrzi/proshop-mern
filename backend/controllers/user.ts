import { RequestHandler } from "express";
import { LoginDto, RegisterDto } from "../Dto/user";
import User from "../models/user";
import generateToken from "../utils/generateToken";
import _ from "lodash";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as LoginDto;

  const user = await User.findOne({ email });

  const validPassword = await user?.comparePassword(password);

  if (!user || !validPassword) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  generateToken(res, user._id);

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
  const { email, name, password } = req.body as RegisterDto;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create a new user
  const newUser = new User({ name, email, password });
  await newUser.save();

  if (!newUser) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // Generate and send token
  generateToken(res, newUser._id);

  // Send response
  return res.status(200).json(_.pick(newUser, "_id", "name", "email", "isAdmin"));
};

// @desc    Logout user (clear cookie)
// @route   POST /api/users/logout
// @access  Public
export const logout: RequestHandler = async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logged out successfully!" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile: RequestHandler = async (req, res, next) => {
  res.send("get profile");
};

// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
export const updateUserProfile: RequestHandler = async (req, res, next) => {
  res.send("update profile");
};

// @desc    Get users
// @route   GET /api/users
// @access  Private -> Admin
export const getAllUsers: RequestHandler = async (req, res, next) => {
  res.send("get all users");
};

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private -> Admin
export const getUser: RequestHandler = async (req, res, next) => {
  res.send("get user");
};

// @desc    Update user
// @route   PATCH /api/users/:id
// @access  Private -> Admin
export const updateUser: RequestHandler = async (req, res, next) => {
  res.send("update user");
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private -> Admin
export const deleteUser: RequestHandler = async (req, res, next) => {
  res.send("delete user");
};
