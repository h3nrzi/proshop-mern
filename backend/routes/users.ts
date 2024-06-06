import express from "express";
import * as userController from "../controllers/user";
import catchAsync from "../middlewares/catchAsync";
const router = express.Router();

router.post("/login", catchAsync(userController.login));
router.post("/logout", catchAsync(userController.logout));

router
  .route("/profile")
  .get(catchAsync(userController.getProfile))
  .patch(catchAsync(userController.updateProfile));

router
  //
  .route("/")
  .post(catchAsync(userController.register))
  .get(catchAsync(userController.getAll));

router
  .route("/:id")
  .get(catchAsync(userController.getOne))
  .patch(catchAsync(userController.update))
  .delete(catchAsync(userController.remove));

export default router;
