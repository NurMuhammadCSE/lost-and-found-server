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


export const userRoutes = router;
