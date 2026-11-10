import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address.");

const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
  remember: z.boolean(),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Full name must contain at least 2 characters."),

    email: emailSchema,
    password: passwordSchema,

    password_confirmation: z.string().min(1, "Please confirm your password."),
  })
  .refine((values) => values.password === values.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const verifyResetOtpSchema = z.object({
  email: emailSchema,

  otp: z.string().regex(/^\d{6}$/, "OTP must contain exactly 6 digits."),
});

export const resetPasswordFormSchema = z
  .object({
    email: emailSchema,

    password: passwordSchema,

    password_confirmation: z.string().min(1, "Please confirm your password."),
  })
  .refine((values) => values.password === values.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  });

export const resetPasswordSchema = z
  .object({
    email: emailSchema,

    otp: z.string().regex(/^\d{6}$/, "OTP must contain exactly 6 digits."),

    password: passwordSchema,

    password_confirmation: z.string().min(1, "Please confirm your password."),
  })
  .refine((values) => values.password === values.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  });

export type LoginInput = z.infer<typeof loginSchema>;

export type RegisterInput = z.infer<typeof registerSchema>;

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export type VerifyResetOtpInput = z.infer<typeof verifyResetOtpSchema>;

export type ResetPasswordFormInput = z.infer<typeof resetPasswordFormSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
