import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { claimValidationSchema } from "./claim.validation";
import { ClaimController } from "./claim.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(claimValidationSchema.createClaimSchema),
  ClaimController.createClaim
);

router.get("/", ClaimController.getAllClaims);

router.put("/:claimId", ClaimController.updateClaimStatus);


export const claimRoutes = router;
