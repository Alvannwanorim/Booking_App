import { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
export default {
  providers: [Github, Credentials],
} satisfies NextAuthConfig;
