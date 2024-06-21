import { z } from "zod";

export const registerFormSchema = z
  .object({
    email: z.string().email("Please input valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(24, "Password can be 24 characters long")
      .regex(
        new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).*$`),
        "Please use at least one number and one letter",
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(24, "Password can be 24 characters long")
      .regex(
        new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).*$`),
        "Please use at least one number letter",
      ),
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
