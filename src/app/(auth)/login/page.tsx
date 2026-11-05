import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";

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
