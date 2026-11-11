"use server";

import { cookies } from "next/headers";
import { ZodError } from "zod";

import { signIn, signOut } from "@/auth";

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

import { RESET_OTP_COOKIE } from "@/features/auth/constants/auth.constants";

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

function hasAuthSessionData(value: unknown): value is AuthSessionData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Partial<AuthSessionData>;

  return (
    typeof session.token === "string" &&
    session.token.trim() !== "" &&
    !!session.user &&
    typeof session.user.id === "number"
  );
}

function getSignInError(signInUrl: unknown): string | null {
  if (typeof signInUrl !== "string") {
    return "Auth.js did not return a sign-in result.";
  }

  try {
    return new URL(signInUrl, "http://localhost").searchParams.get("error");
  } catch {
    return "Auth.js returned an invalid sign-in result.";
  }
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  };
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

    if (!hasAuthSessionData(response.data)) {
      return {
        success: false,
        message: "The login API did not return a valid user and token.",
      };
    }

    const signInUrl = await signIn("credentials", {
      backendToken: response.data.token,
      backendUser: JSON.stringify(response.data.user),
      redirect: false,
    });

    const signInError = getSignInError(signInUrl);

    if (signInError) {
      return {
        success: false,
        message: "Auth.js could not create a login session. Check AUTH_SECRET and restart the app.",
      };
    }

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

    if (!hasAuthSessionData(response.data)) {
      return {
        success: false,
        message: "The registration API did not return a valid user and token.",
      };
    }

    const signInUrl = await signIn("credentials", {
      backendToken: response.data.token,
      backendUser: JSON.stringify(response.data.user),
      redirect: false,
    });

    const signInError = getSignInError(signInUrl);

    if (signInError) {
      return {
        success: false,
        message: "Auth.js could not create a login session. Check AUTH_SECRET and restart the app.",
      };
    }

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

    // Invalidate the Next-Auth session so the user must log in again.
    await signOut({ redirect: false });

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
  const { auth } = await import("@/auth");

  const session = await auth();
  const token = session?.backendToken;

  try {
    if (token) {
      await authService.logout(token);
    }
  } catch {
  } finally {
    await signOut({ redirect: false });
  }

  return {
    success: true,
    message: "You have been logged out.",
    data: null,
  };
}
