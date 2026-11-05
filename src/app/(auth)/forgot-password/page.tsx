import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgot Password?"
      subtitle="we'll send you a verification code to reset your password."
      showSocialLogin={false}
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
