import { RequestHandler } from "express";
import _ from "lodash";
import LoginDto from "../Dto/User/LoginDto";
import RegisterDto from "../Dto/User/RegisterDto";
import { CustomRequest } from "../middlewares/auth";
import User from "../models/user";
import generateToken from "../utils/generateToken";
import UpdateUser from "../Dto/User/UpdateUser";
import Order from "../models/order";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as LoginDto;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  // Check if password is valid
  const validPassword = await user?.comparePassword(password);
  if (!validPassword) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  // Generate and send token
  generateToken(res, user._id);

  // Send response
  return res.status(200).json(_.pick(user, "_id", "name", "email", "isAdmin"));
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
export const getUserProfile: RequestHandler = async (req: CustomRequest, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  return res.status(200).json(_.pick(user, "_id", "name", "email", "isAdmin"));
};

// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
export const updateUserProfile: RequestHandler = async (req: CustomRequest, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update user fields
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = req.body.password;

  const updatedUser = await user.save();

  return res.status(200).json(_.pick(updatedUser, "_id", "name", "email", "isAdmin"));
};

// @desc    Get users
// @route   GET /api/users
// @access  Private -> Admin
export const getAllUsers: RequestHandler = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private -> Admin
export const getUser: RequestHandler = async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
};

// @desc    Update user
// @route   PATCH /api/users/:id
// @access  Private -> Admin
export const updateUser: RequestHandler = async (req, res, next) => {
  const { email, name, isAdmin } = req.body as UpdateUser;

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.email === "admin@gmail.com") {
    res.status(400);
    throw new Error("Cannot update this user");
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.isAdmin = isAdmin ? true : false;

  const updatedUser = await user.save();

  res.status(200).json(_.pick(updatedUser, "_id", "name", "email", "isAdmin"));
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private -> Admin
export const deleteUser: RequestHandler = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.email === "admin@gmail.com") {
    res.status(400);
    throw new Error("Cannot delete this user");
  }

  // Delete orders related to the user
  await Order.deleteMany({ user: user._id });

  // Delete the user
  await User.deleteOne({ _id: user._id });

  res.status(200).json({ message: "User and related orders deleted successfully" });
};
