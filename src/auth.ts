
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import type { AuthUser } from "@/features/auth/types/auth.types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,

  providers: [
    Credentials({
      credentials: {
        backendToken: { type: "text" },
        backendUser: { type: "text" },
      },

      authorize(credentials) {
        const token = credentials?.backendToken as string | undefined;
        const userJson = credentials?.backendUser as string | undefined;

        if (
          typeof token !== "string" ||
          token.trim() === "" ||
          typeof userJson !== "string" ||
          userJson.trim() === ""
        ) {
          return null;
        }

        try {
          const user = JSON.parse(userJson) as AuthUser;

          return {
            id: String(user.id),
            backendToken: token,
            backendUser: userJson,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const authUser = user as typeof user & {
          backendToken: string;
          backendUser: string;
        };

        token.backendToken = authUser.backendToken;
        token.backendUser = authUser.backendUser;
      }

      return token;
    },

    session({ session, token }) {
      session.backendToken =
        typeof token.backendToken === "string"
          ? token.backendToken
          : "";

      if (typeof token.backendUser === "string") {
        try {
          session.user = JSON.parse(token.backendUser) as AuthUser;
        } catch {
          console.error("Failed to parse backend user from session.");
        }
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
});

/** Read the backend access token from the authenticated NextAuth server session. */
export async function getAccessToken(): Promise<string | null> {
  const session = await auth();
  return session?.backendToken ?? null;
}

// Keep the existing helper name available to other server modules.
export const getBackendToken = getAccessToken;
