import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(createUserValidation.createUserSchema),
  userController.createUser
);

router.get("/my-profile", userController.getProfile);

router.put(
  "/my-profile",
  validateRequest(createUserValidation.updateProfileSchema),
  userController.updateProfile
);

export const userRoutes = router;
