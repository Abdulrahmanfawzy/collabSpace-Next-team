"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Mail } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/ui/button";

import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/features/auth/schema/auth.schema";

import {
  useForgotPasswordMutation,
} from "@/features/auth/hooks/useAuthMutations";

export function ForgotPasswordForm() {
  const router = useRouter();

  const mutation = useForgotPasswordMutation();

  const [serverMessage, setServerMessage] =
    useState("");

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),

    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(
    values: ForgotPasswordInput,
  ) {
    setServerMessage("");

    const result = await mutation.mutateAsync(values);

    if (!result.success) {
      setServerMessage(result.message);

      if (result.errors?.email?.[0]) {
        form.setError("email", {
          type: "server",
          message: result.errors.email[0],
        });
      }

      return;
    }

    router.push(
      `/verify-code?email=${encodeURIComponent(values.email)}`,
    );
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          required
          disabled={mutation.isPending}
          leadingIcon={<Mail aria-hidden="true" />}
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
          ? "Sending..."
          : "Send verification code"}
      </Button>

      <p className="mt-6 text-center text-[9px] text-text-body md:text-sm">
        Remember your password?{" "}

        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}