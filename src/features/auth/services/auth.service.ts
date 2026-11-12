
import type {
  ApiResponse,
  AuthFieldErrors,
  AuthSessionData,
  CurrentUserData,
  ForgotPasswordData,
  GoogleRedirectData,
} from "@/features/auth/types/auth.types";

import type {
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  VerifyResetOtpInput,
  ResetPasswordInput,
} from "@/features/auth/schema/auth.schema";

export class AuthApiError extends Error {
  errors?: AuthFieldErrors;
  status: number;

  constructor(message: string, status: number, errors?: AuthFieldErrors) {
    super(message);

    this.name = "AuthApiError";
    this.status = status;
    this.errors = errors;
  }
}

function getAuthUrl(endpoint: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL environment variable is missing."
    );
  }

  return `${baseUrl.replace(/\/+$/, "")}/api/v1/auth/${endpoint.replace(/^\/+/, "")}`;
}

async function parseResponse<T>(
  response: Response
): Promise<ApiResponse<T>> {
  const payload = (await response.json().catch(() => null)) as
    | (ApiResponse<T> & {
        errors?: AuthFieldErrors;
      })
    | null;

  if (!response.ok || !payload || payload.success !== true) {
    throw new AuthApiError(
      payload?.message ?? `Request failed with status ${response.status}.`,
      response.status,
      payload?.errors
    );
  }

  return payload;
}

async function requestAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(getAuthUrl(endpoint), {
    ...options,
    headers,
    cache: "no-store",
  });

  return parseResponse<T>(response);
}

export const authService = {
  login(input: LoginInput) {
    return requestAuth<AuthSessionData>("login", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  register(input: RegisterInput) {
    return requestAuth<AuthSessionData>("register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  me(token: string) {
    return requestAuth<CurrentUserData>("me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  forgotPassword(input: ForgotPasswordInput) {
    return requestAuth<ForgotPasswordData>("forgot-password", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  verifyResetOtp(input: VerifyResetOtpInput) {
    return requestAuth<null>("verify-reset-otp", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  resetPassword(input: ResetPasswordInput) {
    return requestAuth<null>("reset-password", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async googleRedirect(): Promise<ApiResponse<GoogleRedirectData>> {
    const url = getAuthUrl("social/google/redirect");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      redirect: "manual",
      cache: "no-store",
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");

      if (location) {
        return {
          success: true,
          message: "Google authorization URL generated.",
          data: {
            provider: "google",
            authorization_url: new URL(
              location,
              response.url || url
            ).toString(),
          },
        };
      }
    }

    return parseResponse<GoogleRedirectData>(response);
  },

  logout(token: string) {
    return requestAuth<null>("logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
