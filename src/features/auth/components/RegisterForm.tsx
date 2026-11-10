"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/ui/button";

import {
  registerSchema,
  type RegisterInput,
} from "@/features/auth/schema/auth.schema";

import {
  useRegisterMutation,
} from "@/features/auth/hooks/useAuthMutations";

export function RegisterForm() {
  const router = useRouter();

  const mutation = useRegisterMutation();

  const [serverMessage, setServerMessage] =
    useState("");

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(values: RegisterInput) {
    setServerMessage("");

    const result = await mutation.mutateAsync(values);

    if (!result.success) {
      setServerMessage(result.message);

      Object.entries(result.errors ?? {}).forEach(
        ([field, messages]) => {
          if (field in form.getValues()) {
            form.setError(
              field as keyof RegisterInput,
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

    router.replace("/");
    router.refresh();
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        <FormInput
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Full Name"
          autoComplete="name"
          required
          disabled={mutation.isPending}
          leadingIcon={
            <UserRound aria-hidden="true" />
          }
        />

        <FormInput
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Your Email"
          autoComplete="email"
          required
          disabled={mutation.isPending}
          leadingIcon={<Mail aria-hidden="true" />}
        />

        <FormInput
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
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
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
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
        className="mt-6 w-full rounded-full px-3 text-[9px] md:text-[14px] font-medium shadow-none"
      >
        {mutation.isPending ? "Creating account..." : "Sign up"}
      </Button>

      <p className="mt-6 text-center text-[9px] md:text-sm leading-3.25 text-text-body">
        Already have an account?{" "}

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