import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/AuthCard";

import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{
    email?: string | string[];
  }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;

  const email =
    typeof params.email === "string"
      ? params.email
      : "";

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Create a new password for your account."
      showSocialLogin={false}
    >
      <ResetPasswordForm email={email} />
    </AuthCard>
  );
}