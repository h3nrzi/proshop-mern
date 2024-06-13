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
import auth from "../middlewares/auth";
import catchAsync from "../middlewares/catchAsync";
const router = express.Router();

router.post("/", catchAsync(register));
router.post("/login", catchAsync(login));
router.post("/logout", catchAsync(logout));

/////////////////// Private
router.use(catchAsync(auth.protect));

router
  //
  .route("/profile")
  .get(catchAsync(getUserProfile))
  .patch(catchAsync(updateUserProfile));

/////////////////// Admin
router.use(catchAsync(auth.admin));

router.get("/", catchAsync(getAllUsers));

router
  .route("/:id")
  .get(catchAsync(getUser))
  .patch(catchAsync(updateUser))
  .delete(catchAsync(deleteUser));

export default router;
