// foundItem.validation.ts
import { z } from "zod";

export const createFoundItemSchema = z.object({
  body: z.object({
    categoryId: z.string().uuid("Invalid category ID"), // Ensure categoryId is a valid UUID
    foundItemName: z
      .string()
      .min(2, "Item name must be at least 2 characters long") // Minimum length of 2
      .max(100, "Item name must be 100 characters or less"), // Maximum length of 100
    description: z
      .string()
      .max(500, "Description must be 500 characters or less") // Maximum length of 500
      .optional(), // Description is optional
    location: z
      .string()
      .min(2, "Location must be at least 2 characters long") // Minimum length of 2
      .max(100, "Location must be 100 characters or less"), // Maximum length of 100
  }),
});

export const foundItemsValidationSchema = {
  createFoundItemSchema,
};
