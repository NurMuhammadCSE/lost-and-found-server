// claim.validation.ts
import { z } from "zod";

export const createClaimSchema = z.object({
  body: z.object({
    foundItemId: z.string().uuid("Invalid found item ID"),
    distinguishedFeatures: z
      .string()
      .min(10, "Distinguishing features must be at least 10 characters long"),
    lostDate: z
      .string()
      .datetime({ message: "Invalid date format. Must be ISO 8601." }),
  }),
});

export const claimValidationSchema = {
  createClaimSchema,
};
