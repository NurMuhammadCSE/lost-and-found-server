import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    profile: z.object({
      bio: z.string({
        required_error: "Bio is required!",
      }),
      age: z.number({
        required_error: "Age is required!",
      }),
    }),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
    age: z
      .number()
      .int()
      .min(0, "Age must be a positive number")
      .max(120, "Age must be less than or equal to 120")
      .optional(),
  }),
});

export const createUserValidation = {
  createUserSchema,
  updateProfileSchema,
};
