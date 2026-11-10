"use server";

import { cookies } from "next/headers";
import { ZodError } from "zod";

import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  verifyResetOtpSchema,
  resetPasswordSchema,
  resetPasswordFormSchema,
  type LoginInput,
  type RegisterInput,
  type ForgotPasswordInput,
  type VerifyResetOtpInput,
  type ResetPasswordFormInput,
} from "@/features/auth/schema/auth.schema";

import {
  AUTH_TOKEN_COOKIE,
  RESET_OTP_COOKIE,
} from "@/features/auth/constants/auth.constants";

import {
  authService,
  AuthApiError,
} from "@/features/auth/services/auth.service";

import type {
  AuthActionResult,
  AuthUser,
  AuthSessionData,
  ForgotPasswordData,
  GoogleRedirectData,
} from "@/features/auth/types/auth.types";

interface ResetOtpSession {
  email: string;
  otp: string;
}

function validationFailure(error: ZodError): AuthActionResult<never> {
  return {
    success: false,
    message: "Please correct the validation errors.",
    errors: error.flatten().fieldErrors as Record<string, string[] | undefined>,
  };
}

function handleFailure(error: unknown): AuthActionResult<never> {
  if (error instanceof AuthApiError) {
    return {
      success: false,
      message: error.message,
      errors: error.errors,
    };
  }

  return {
    success: false,
    message:
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.",
  };
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  };
}

async function saveSession(session: AuthSessionData): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_TOKEN_COOKIE, session.token, {
    ...cookieOptions(),
    path: "/",
  });
}

async function clearResetOtpCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(RESET_OTP_COOKIE, "", {
    ...cookieOptions(),
    path: "/reset-password",
    maxAge: 0,
  });
}

async function saveResetOtpSession(session: ResetOtpSession): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(RESET_OTP_COOKIE, JSON.stringify(session), {
    ...cookieOptions(),
    path: "/reset-password",
    maxAge: 10 * 60,
  });
}

function readResetOtpSession(value?: string): ResetOtpSession | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<ResetOtpSession>;

    if (typeof parsed.email !== "string" || typeof parsed.otp !== "string") {
      return null;
    }

    return {
      email: parsed.email,
      otp: parsed.otp,
    };
  } catch {
    return null;
  }
}

export async function loginAction(
  input: LoginInput,
): Promise<AuthActionResult<AuthUser>> {
  const validation = loginSchema.safeParse(input);

  if (!validation.success) {
    return validationFailure(validation.error);
  }

  try {
    const response = await authService.login(validation.data);

    await saveSession(response.data);

    return {
      success: true,
      message: response.message,
      data: response.data.user,
    };
  } catch (error) {
    return handleFailure(error);
  }
}

export async function registerAction(
  input: RegisterInput,
): Promise<AuthActionResult<AuthUser>> {
  const validation = registerSchema.safeParse(input);

  if (!validation.success) {
    return validationFailure(validation.error);
  }

  try {
    const response = await authService.register(validation.data);

    await saveSession(response.data);

    return {
      success: true,
      message: response.message,
      data: response.data.user,
    };
  } catch (error) {
    return handleFailure(error);
  }
}

export async function forgotPasswordAction(
  input: ForgotPasswordInput,
): Promise<AuthActionResult<ForgotPasswordData>> {
  const validation = forgotPasswordSchema.safeParse(input);

  if (!validation.success) {
    return validationFailure(validation.error);
  }

  try {
    const response = await authService.forgotPassword(validation.data);

    // A new OTP invalidates the previous reset session.
    await clearResetOtpCookie();

    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return handleFailure(error);
  }
}

export async function verifyResetOtpAction(
  input: VerifyResetOtpInput,
): Promise<AuthActionResult<null>> {
  const validation = verifyResetOtpSchema.safeParse(input);

  if (!validation.success) {
    return validationFailure(validation.error);
  }

  try {
    const response = await authService.verifyResetOtp(validation.data);

    // Save OTP server-side instead of putting it in URL.
    await saveResetOtpSession({
      email: validation.data.email,
      otp: validation.data.otp,
    });

    return {
      success: true,
      message: response.message,
      data: null,
    };
  } catch (error) {
    return handleFailure(error);
  }
}

export async function resetPasswordAction(
  input: ResetPasswordFormInput,
): Promise<AuthActionResult<null>> {
  const formValidation = resetPasswordFormSchema.safeParse(input);

  if (!formValidation.success) {
    return validationFailure(formValidation.error);
  }

  const cookieStore = await cookies();

  const resetSession = readResetOtpSession(
    cookieStore.get(RESET_OTP_COOKIE)?.value,
  );

  if (!resetSession) {
    return {
      success: false,
      message:
        "Your verification session has expired. Please request a new reset code.",
    };
  }

  if (resetSession.email !== formValidation.data.email) {
    return {
      success: false,
      message: "The verification session does not match this email address.",
    };
  }

  const backendPayload = {
    ...formValidation.data,
    otp: resetSession.otp,
  };

  const backendValidation = resetPasswordSchema.safeParse(backendPayload);

  if (!backendValidation.success) {
    return validationFailure(backendValidation.error);
  }

  try {
    const response = await authService.resetPassword(backendValidation.data);

    cookieStore.delete(AUTH_TOKEN_COOKIE);

    await clearResetOtpCookie();

    return {
      success: true,
      message: response.message,
      data: null,
    };
  } catch (error) {
    return handleFailure(error);
  }
}

export async function googleRedirectAction(): Promise<
  AuthActionResult<GoogleRedirectData>
> {
  try {
    const response = await authService.googleRedirect();

    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return handleFailure(error);
  }
}

export async function logoutAction(): Promise<AuthActionResult<null>> {
  const cookieStore = await cookies();

  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;

  if (!token) {
    return {
      success: true,
      message: "You are already logged out.",
      data: null,
    };
  }

  try {
    const response = await authService.logout(token);

    return {
      success: true,
      message: response.message,
      data: null,
    };
  } catch (error) {
    return handleFailure(error);
  } finally {
    cookieStore.delete(AUTH_TOKEN_COOKIE);
  }
}
