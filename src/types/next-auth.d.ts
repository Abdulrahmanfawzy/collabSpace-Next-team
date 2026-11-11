import type { AuthUser } from "@/features/auth/types/auth.types";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
 
  interface Session extends DefaultSession {
    backendToken: string;
    user: AuthUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
    backendUser?: string;
  }
}

