import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  getUserProfile,
  login,
  logout,
  register,
  updateUser,
  updateUserProfile,
} from "../controllers/user";
import { admin, protect } from "../middlewares/auth";
import catchAsync from "../middlewares/catchAsync";
const router = express.Router();

router.post("/", catchAsync(register));
router.post("/login", catchAsync(login));
router.post("/logout", catchAsync(logout));

////////// Access -> Private
router.use(catchAsync(protect));

router
  //
  .route("/profile")
  .get(catchAsync(getUserProfile))
  .patch(catchAsync(updateUserProfile));

////////// Access -> Admin
router.use(catchAsync(admin));

router.get("/", catchAsync(getAllUsers));

router
  .route("/:id")
  .get(catchAsync(getUser))
  .patch(catchAsync(updateUser))
  .delete(catchAsync(deleteUser));

export default router;
