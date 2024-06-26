import { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import * as bcrypt from "bcryptjs";
export default {
  providers: [
    Github,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordIsMatch = await bcrypt.compare(password, user.password);
          if (passwordIsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
