import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Sign Up"
      subtitle="Connect with every application!"
    >
      <RegisterForm />
    </AuthCard>
  );
}
