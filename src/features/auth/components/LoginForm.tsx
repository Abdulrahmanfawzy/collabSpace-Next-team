"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { LockKeyhole, Mail } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/ui/button";

import {
  loginSchema,
  type LoginInput,
} from "@/features/auth/schema/auth.schema";

import {
  useLoginMutation,
} from "@/features/auth/hooks/useAuthMutations";

export function LoginForm({
  redirectTo,
}: {
  redirectTo?: string;
}) {
  const router = useRouter();

  const mutation = useLoginMutation();

  const [serverMessage, setServerMessage] =
    useState("");

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  async function onSubmit(values: LoginInput) {
    setServerMessage("");

    const result = await mutation.mutateAsync(values);

    if (!result.success) {
      setServerMessage(result.message);

      Object.entries(result.errors ?? {}).forEach(
        ([field, messages]) => {
          if (field in form.getValues()) {
            form.setError(
              field as keyof LoginInput,
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

    const destination =
      redirectTo &&
        redirectTo.startsWith("/") &&
        !redirectTo.startsWith("//")
        ? redirectTo
        : "/";

    router.replace(destination);
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
          autoComplete="current-password"
          required
          disabled={mutation.isPending}
          leadingIcon={
            <LockKeyhole aria-hidden="true" />
          }
        />
      </div>

      <div className="mt-6 flex items-center justify-between gap-2">
        <label
          className="inline-flex cursor-pointer items-center gap-1.25 text-[9px] md:text-sm
         leading-3.25 text-text-body"
        >
          <input
            type="checkbox"
            {...form.register("remember")}
            disabled={mutation.isPending}
            className="size-5 cursor-pointer accent-primary"
          />

          Remember Me
        </label>

        <Link
          href="/forgot-password"
          className="text-[9px] md:text-sm font-semibold leading-3.25 text-primary hover:underline"
        >
          Forget Password?
        </Link>
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
        className="mt-6 w-full rounded-full px-3 text-[9px] md:text-sm font-medium shadow-none"
      >
        {mutation.isPending ? "Logging in..." : "Log in"}
      </Button>

      <p className="mt-6 text-center text-[9px] md:text-sm leading-3.25 text-text-body">
        Don&apos;t have an account yet?{" "}

        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}