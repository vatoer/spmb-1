import NextAuth from "next-auth";
import authConfig from "./auth.config";

// reference https://github.com/nextauthjs/next-auth/issues/10568

// export const nextAuth = NextAuth({
//   debug: true,
//   session: { strategy: "jwt" },
//   secret: process.env.AUTH_SECRET,
//   ...authConfig,
// });

// export const {
//   handlers: { GET, POST },
//   signOut,
//   auth,
// } = nextAuth;

// export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 1 * 3600, updateAge: 3600 },
  ...authConfig,
});
