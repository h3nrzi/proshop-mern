import { RequestHandler } from "express";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login: RequestHandler = async (req, res, next) => {
  res.send("auth user");
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
