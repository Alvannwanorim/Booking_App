"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validationResult = LoginSchema.safeParse(values);

  if (!validationResult.success) {
    return { error: "invalid fields" };
  }

  const { email, password } = validationResult.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
  }
};
