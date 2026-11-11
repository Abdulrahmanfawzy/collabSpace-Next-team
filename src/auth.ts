import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import type { AuthUser } from "@/features/auth/types/auth.types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        backendToken: { type: "text" },
        backendUser: { type: "text" },
      },

      authorize(credentials) {
        const token = credentials?.backendToken as string | undefined;
        const userJson = credentials?.backendUser as string | undefined;

        if (!token || !userJson) return null;

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
        token.backendToken = (user as unknown as { backendToken: string }).backendToken;
        token.backendUser = (user as unknown as { backendUser: string }).backendUser;
      }
      return token;
    },


    session({ session, token }): any {
      session.backendToken = token.backendToken as string;

      if (token.backendUser) {
        try {
          (session as any).user = JSON.parse(token.backendUser as string) as AuthUser;
        } catch {
        }
      }

      return session;
    },
  },

  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
  },
});


export async function getBackendToken(): Promise<string | null> {
  const session = await auth();
  return session?.backendToken ?? null;
}
