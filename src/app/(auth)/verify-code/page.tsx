import type { Metadata } from "next";

import { AuthCard } from "@/features/auth/components/AuthCard";

import { VerifyCodeForm } from "@/features/auth/components/VerifyCodeForm";

export const metadata: Metadata = {
  title: "Verify Code",
};

interface VerifyCodePageProps {
  searchParams: Promise<{
    email?: string | string[];
  }>;
}

export default async function VerifyCodePage({
  searchParams,
}: VerifyCodePageProps) {
  const params = await searchParams;

  const email =
    typeof params.email === "string"
      ? params.email
      : "";

  return (
    <AuthCard
      title="Verify Your Email"
      subtitle=""
      showSocialLogin={false}
    >
      <VerifyCodeForm email={email} />
    </AuthCard>
  );
}