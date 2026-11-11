"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  verifyResetOtpSchema,
  type VerifyResetOtpInput,
} from "@/features/auth/schema/auth.schema";

import {
  useVerifyResetOtpMutation,
  useForgotPasswordMutation,
} from "@/features/auth/hooks/useAuthMutations";

interface VerifyCodeFormProps {
  email: string;
}

export function VerifyCodeForm({
  email,
}: VerifyCodeFormProps) {
  const router = useRouter();

  const verifyMutation = useVerifyResetOtpMutation();
  const resendMutation = useForgotPasswordMutation();

  const [serverMessage, setServerMessage] =
    useState("");

  const form = useForm<VerifyResetOtpInput>({
    resolver: zodResolver(verifyResetOtpSchema),

    defaultValues: {
      email,
      otp: "",
    },
  });

  async function onSubmit(
    values: VerifyResetOtpInput,
  ) {
    setServerMessage("");

    const result =
      await verifyMutation.mutateAsync(values);

    if (!result.success) {
      setServerMessage(result.message);

      if (result.errors?.otp?.[0]) {
        form.setError("otp", {
          type: "server",
          message: result.errors.otp[0],
        });
      }

      return;
    }

    router.push(
      `/reset-password?email=${encodeURIComponent(values.email)}`,
    );
  }

  async function handleResend() {
    setServerMessage("");

    const result = await resendMutation.mutateAsync({
      email,
    });

    setServerMessage(result.message);
  }

  if (!email) {
    return (
      <div className="text-center">
        <p className="text-sm text-destructive">
          Email address is missing. Request a new verification code.
        </p>

        <Link
          href="/forgot-password"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
        >
          Return to Forgot Password
        </Link>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <input
        type="hidden"
        {...form.register("email")}
      />

      <p className="mb-2 text-center text-[10px] leading-5 text-text-body md:text-sm">
        Enter the 6-digit verification code sent to:
      </p>

      <p className="mb-6 text-center text-xs font-semibold text-text-primary">
        {email}
      </p>

      <div>
        <label className="mb-2 block text-sm font-medium text-text-body">
          Verification code
        </label>

        <Controller
          control={form.control}
          name="otp"
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="^[0-9]+$"
              containerClassName="w-full justify-center"
              disabled={verifyMutation.isPending}
              aria-invalid={
                Boolean(form.formState.errors.otp)
              }
            >
              <InputOTPGroup>
                {Array.from(
                  { length: 6 },
                  (_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                    />
                  ),
                )}
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {form.formState.errors.otp && (
          <p className="mt-2 text-xs text-destructive">
            {form.formState.errors.otp.message}
          </p>
        )}
      </div>

      {serverMessage && (
        <p
          role="status"
          className="mt-4 text-center text-xs text-text-body"
        >
          {serverMessage}
        </p>
      )}

      <Button
        type="submit"
        variant="auth"
        disabled={verifyMutation.isPending}
        className="mt-6 w-full rounded-full text-[9px] font-medium shadow-none md:text-sm"
      >
        {verifyMutation.isPending
          ? "Verifying..."
          : "Verify code"}
      </Button>

      <p className="mt-6 text-center text-[9px] text-text-body md:text-sm">
        Didn&apos;t receive the code?{" "}

        <Button
          type="button"
          variant="link"
          size="xs"
          disabled={resendMutation.isPending}
          onClick={handleResend}
          className="h-auto p-0 text-[9px] md:text-sm"
        >
          {resendMutation.isPending
            ? "Sending..."
            : "Resend code"}
        </Button>
      </p>

      <p className="mt-3 text-center text-[9px] text-text-body md:text-sm">
        <Link
          href="/forgot-password"
          className="font-semibold text-primary hover:underline"
        >
          Change email address
        </Link>
      </p>
    </form>
  );
}