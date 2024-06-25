import { z } from "zod";

export const registerFormSchema = z
  .object({
    email: z.string().email("Please input valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(24, "Password can be 24 characters long")
      .regex(
        new RegExp(
          `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[\\sA-Za-z\\d@$!%*?&]{8,24}$`,
        ),
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password must match",
      path: ["confirmPassword"],
    },
  );

export const loginFormSchema = z.object({
  email: z.string().email("Please input valid email address"),
  password: z.string(),
});
