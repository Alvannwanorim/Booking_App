"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { RegisterSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
import * as bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validationResult = RegisterSchema.safeParse(values);

  if (!validationResult.success) {
    return { error: "invalid fields" };
  }

  const { email, password, first_name, last_name } = validationResult.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already taken" };
  }

  await db.user.create({
    data: {
      firstName: first_name,
      lastName: last_name,
      name: `${first_name} ${last_name}`,
      email,
      password: hashedPassword,
    },
  });
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
