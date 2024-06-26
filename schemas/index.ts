import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export const RegisterSchema = z.object({
  first_name: z.string().min(1, {
    message: "first name is required",
  }),
  last_name: z.string().min(1, {
    message: "last name is required",
  }),
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
