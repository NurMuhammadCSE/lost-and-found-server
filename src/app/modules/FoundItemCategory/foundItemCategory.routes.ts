import express from "express";
import { createFoundItemCategoryController } from "./foundItemCategory.controller";
import validateRequest from "../../middlewares/validateRequest";
import { foundItemCategoryValidation } from "./foundItemCategory.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(foundItemCategoryValidation.createFoundItemCategorySchema),
  createFoundItemCategoryController.createFoundItemCategory
);

export const foundItemCategoryRoutes = router;
