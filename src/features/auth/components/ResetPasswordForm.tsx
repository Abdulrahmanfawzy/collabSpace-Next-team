"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/ui/button";

type ResetPasswordValues = {
  password: string;
  confirmPassword: string;
};

export function ResetPasswordForm() {
  const { control, handleSubmit, watch } = useForm<ResetPasswordValues>({
    defaultValues: { password: "", confirmPassword: "" },
  });
  const password = watch("password");

  return (
    <form noValidate onSubmit={handleSubmit(() => {})}>
      <div className="space-y-6">
        <FormInput
          control={control}
          name="password"
          label="New password"
          type="password"
          placeholder="Enter new password"
          autoComplete="new-password"
          required
          leadingIcon={<LockKeyhole aria-hidden="true" />}
          rules={{
            required: "New password is required.",
            minLength: {
              value: 8,
              message: "Password must contain at least 8 characters.",
            },
          }}
        />

        <FormInput
          control={control}
          name="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Confirm new password"
          autoComplete="new-password"
          required
          leadingIcon={<LockKeyhole aria-hidden="true" />}
          rules={{
            required: "Please confirm your password.",
            validate: (value) =>
              value === password || "Passwords do not match.",
          }}
        />
      </div>

      <Button type="submit" variant="auth" className="mt-6 w-full rounded-full text-[9px] font-medium shadow-none md:text-sm">
        Reset password
      </Button>

      <p className="mt-6 text-center text-[9px] text-text-body md:text-sm">
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Back to Sign In
        </Link>
      </p>
    </form>
  );
}
