"use client";

import Link from "next/link";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/ui/button";

type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const { control, handleSubmit } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: "",
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
          name="fullName"
          label="Full Name"
          placeholder="Full Name"
          autoComplete="name"
          required
          leadingIcon={<UserRound aria-hidden="true" className="" />}
          rules={{
            required: "Full name is required.",
            minLength: {
              value: 2,
              message: "Enter at least 2 characters.",
            },
          }}
        />

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
          autoComplete="new-password"
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

      <label className="mt-6 inline-flex cursor-pointer items-center gap-1.25 text-[9px]
      md:text-sm leading-3.25 text-text-body">
        <input
          type="checkbox"
          defaultChecked
          className="size-4.25 cursor-pointer accent-primary"
        />
        Remember Me
      </label>

      <Button
        type="submit"
        variant="auth"
        className="mt-2.75 w-full rounded-full px-3 text-[9px] md:text-[14px] font-medium 
        shadow-none"
      >
        Sign up
      </Button>

      <p className="mt-6 text-center text-[9px] md:text-sm  leading-3.25 text-text-body">
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
