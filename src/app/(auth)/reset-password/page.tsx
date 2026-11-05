import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Reset Password"
      subtitle="Create a new password for your account."
      showSocialLogin={false}
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
