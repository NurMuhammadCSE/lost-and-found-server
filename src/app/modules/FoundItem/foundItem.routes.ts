import express from "express";
import { FoundItemsController } from "./foundItem.controller";
import validateRequest from "../../middlewares/validateRequest";
import { foundItemsValidationSchema } from "./foundItem.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(foundItemsValidationSchema.createFoundItemSchema),
  FoundItemsController.createFoundItems
);

export const foundItemsRoutes = router;
