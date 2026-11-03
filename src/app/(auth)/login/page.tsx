import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign In"
      subtitle="Welcome back, you've been missed!"
    >
      <LoginForm />
    </AuthCard>
  );
}
