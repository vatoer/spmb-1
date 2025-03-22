import { getUserByEmail } from "@/data/auth/user";
import { verifyPassword } from "@/utils/hashing/pbkdf2";
import { LoginSchema } from "@/zod/schemas/auth/login";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = LoginSchema.safeParse(credentials);

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const isPasswordMatch = await verifyPassword(password, user.password);
          if (!isPasswordMatch) {
            return null;
          }

          //return user;
          return {
            ...user,
          };
        }

        return null;
      },
    }),
    Google,
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (!user || !account) {
        //throw new Error("Invalid sign in");
        return false;
      }

      console.log("[signIn] account", account);
      console.log("[signIn] profile", profile);
      console.log("[signIn] email", email);
      console.log("[signIn] credentials", credentials);

      //console.log("[signIn] user", user);
      return true;
    },
    async session({ session, token, user }) {
      console.log("[session] session", session);
      console.log("[session] token", token);
      console.log("[session] user", user);
      session.user.id = token.sub as string;
      session.user.name = token.name;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      console.log("[jwt] token", token);
      console.log("[jwt] user", user);
      console.log("[jwt] account", account);
      console.log("[jwt] profile", profile);
      if (user) {
        console.log("[jwt] user", user);
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
