"use client";

import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/ui/button";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(() => {
      })}
    >
      <div className="space-y-6">
        <FormInput
          control={control}
          name="email"
          label="Email"
          type="email"
          placeholder="Your Email"
          autoComplete="email"
          required
          leadingIcon={<Mail aria-hidden="true" className="" />}
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address.",
            },
          }}
        />

        <FormInput
          control={control}
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          leadingIcon={
            <LockKeyhole aria-hidden="true" className="" />
          }
          rules={{
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must contain at least 8 characters.",
            },
          }}
        />
      </div>

      <div className="mt-6 flex items-center justify-between gap-2">
        <label className="inline-flex cursor-pointer items-center gap-1.25 text-[9px] md:text-sm
         leading-3.25 text-text-body">
          <input
            type="checkbox"
            defaultChecked
            className="size-5 cursor-pointer accent-primary"
          />
          Remember Me
        </label>

        <Button
          type="button"
          variant="link"
          size="xs"
          className="h-auto p-0  text-[9px] md:text-sm font-normal leading-3.25 no-underline
           hover:underline"
        >
          Forget Password?
        </Button>
      </div>

      <Button
        type="submit"
        variant="auth"
        className="mt-6  w-full rounded-full px-3 text-[9px] md:text-sm font-medium shadow-none"
      >
        Log in
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
