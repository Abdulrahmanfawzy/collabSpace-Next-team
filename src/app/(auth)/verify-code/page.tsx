import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { VerifyCodeForm } from "@/features/auth/components/verify-code-form";

export const metadata: Metadata = {
  title: "Verify Code",
};

export default function VerifyCodePage() {
  return (
    <AuthCard
      title="Verify Your Email"
      subtitle=""
      showSocialLogin={false}
    >
      <VerifyCodeForm />
    </AuthCard>
  );
}
