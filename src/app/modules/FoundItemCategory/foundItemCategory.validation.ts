// foundItemCategory.validation.ts
import { z } from "zod";

export const createFoundItemCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, { message: "Category name must be at least 2 characters long" })
      .max(50, { message: "Category name must be at most 50 characters long" }),
  }),
});

export const foundItemCategoryValidation = {
  createFoundItemCategorySchema,
};
