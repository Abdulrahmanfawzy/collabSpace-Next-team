"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type VerifyCodeValues = {
  code: string;
};

export function VerifyCodeForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeValues>({
    defaultValues: { code: "" },
  });

  return (
    <form noValidate onSubmit={handleSubmit(() => {})}>
      <p className="mb-6 text-center text-[10px] leading-5 text-text-body md:text-sm">
        Enter the 6-digit verification code sent to your email address.
      </p>

      <div>
        <label className="mb-2 block text-sm font-medium text-text-body">
          Verification code
        </label>

        <Controller
          control={control}
          name="code"
          rules={{
            required: "Verification code is required.",
            pattern: {
              value: /^\d{4}$/,
              message: "Enter the 6-digit verification code.",
            },
          }}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="^[0-9]+$"
              containerClassName="w-full justify-center"
            >
              <InputOTPGroup>
                {Array.from({ length: 4 }, (_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {errors.code && (
          <p className="mt-2 text-xs text-destructive">{errors.code.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="auth"
        className="mt-6 w-full rounded-full text-[9px] font-medium shadow-none md:text-sm"
      >
        Verify code
      </Button>

      <p className="mt-6 text-center text-[9px] text-text-body md:text-sm">
        Didn&apos;t receive the code?{" "}
        <Button
          type="button"
          variant="link"
          size="xs"
          className="h-auto p-0 text-[9px] md:text-sm"
        >
          Resend code
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
