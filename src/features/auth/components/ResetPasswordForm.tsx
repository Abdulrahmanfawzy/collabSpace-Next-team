"use client";

import { useState } from "react";

import Link from "next/link";

import { LockKeyhole } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/ui/button";

import {
  resetPasswordFormSchema,
  type ResetPasswordFormInput,
} from "@/features/auth/schema/auth.schema";

import {
  useResetPasswordMutation,
} from "@/features/auth/hooks/useAuthMutations";

interface ResetPasswordFormProps {
  email: string;
}

export function ResetPasswordForm({
  email,
}: ResetPasswordFormProps) {
  const mutation = useResetPasswordMutation();

  const [serverMessage, setServerMessage] =
    useState("");

  const [completed, setCompleted] =
    useState(false);

  const form = useForm<ResetPasswordFormInput>({
    resolver: zodResolver(resetPasswordFormSchema),

    defaultValues: {
      email,
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(
    values: ResetPasswordFormInput,
  ) {
    setServerMessage("");

    const result = await mutation.mutateAsync(values);

    if (!result.success) {
      setServerMessage(result.message);

      Object.entries(result.errors ?? {}).forEach(
        ([field, messages]) => {
          if (field in form.getValues()) {
            form.setError(
              field as keyof ResetPasswordFormInput,
              {
                type: "server",
                message:
                  messages?.[0] ?? result.message,
              },
            );
          }
        },
      );

      return;
    }

    setServerMessage(result.message);
    setCompleted(true);
  }

  if (!email) {
    return (
      <div className="text-center">
        <p className="text-sm text-destructive">
          Your email address is missing.
        </p>

        <Link
          href="/forgot-password"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
        >
          Request a new reset code
        </Link>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="text-center">
        <p className="text-sm text-support-green">
          {serverMessage}
        </p>

        <Link
          href="/login"
          className="mt-6 inline-block font-semibold text-primary hover:underline"
        >
          Back to Sign In
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

      <div className="space-y-6">
        <FormInput
          control={form.control}
          name="password"
          label="New password"
          type="password"
          placeholder="Enter new password"
          autoComplete="new-password"
          required
          disabled={mutation.isPending}
          leadingIcon={
            <LockKeyhole aria-hidden="true" />
          }
        />

        <FormInput
          control={form.control}
          name="password_confirmation"
          label="Confirm password"
          type="password"
          placeholder="Confirm new password"
          autoComplete="new-password"
          required
          disabled={mutation.isPending}
          leadingIcon={
            <LockKeyhole aria-hidden="true" />
          }
        />
      </div>

      {serverMessage && (
        <p
          role="alert"
          className="mt-4 text-center text-xs text-destructive"
        >
          {serverMessage}
        </p>
      )}

      <Button
        type="submit"
        variant="auth"
        disabled={mutation.isPending}
        className="mt-6 w-full rounded-full text-[9px] font-medium shadow-none md:text-sm"
      >
        {mutation.isPending
          ? "Resetting password..."
          : "Reset password"}
      </Button>

      <p className="mt-6 text-center text-[9px] text-text-body md:text-sm">
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Back to Sign In
        </Link>
      </p>
    </form>
  );
}