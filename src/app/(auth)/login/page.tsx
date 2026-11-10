import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
};

interface LoginPageProps {
  searchParams?: Promise<{
    redirectTo?: string | string[];
  }>;
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = searchParams
    ? await searchParams
    : {};

  const redirectTo =
    typeof params.redirectTo === "string"
      ? params.redirectTo
      : undefined;

  return (
    <AuthCard
      title="Sign In"
      subtitle="Welcome back, you've been missed!"
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthCard>
  );
}