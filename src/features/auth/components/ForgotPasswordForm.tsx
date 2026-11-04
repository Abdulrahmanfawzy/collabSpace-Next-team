"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/ui/button";

type ForgotPasswordValues = {
  email: string;
};

export function ForgotPasswordForm() {
  const { control, handleSubmit } = useForm<ForgotPasswordValues>({
    defaultValues: { email: "" },
  });

  return (
    <form noValidate onSubmit={handleSubmit(() => {})}>
      <div className="space-y-6">
        <FormInput
          control={control}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          required
          leadingIcon={<Mail aria-hidden="true" />}
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address.",
            },
          }}
        />
      </div>

      <Button type="submit" variant="auth" className="mt-6 w-full rounded-full text-[9px] font-medium shadow-none md:text-sm">
        Send verification code
      </Button>

      <p className="mt-6 text-center text-[9px] text-text-body md:text-sm">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}
