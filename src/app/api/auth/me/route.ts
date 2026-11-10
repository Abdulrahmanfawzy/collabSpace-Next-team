import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_TOKEN_COOKIE } from "@/features/auth/constants/auth.constants";

import {
  authService,
  AuthApiError,
} from "@/features/auth/services/auth.service";

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthenticated.",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const response = await authService.me(token);

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof AuthApiError) {
      
      if (error.status === 401) {
        cookieStore.delete(AUTH_TOKEN_COOKIE);
      }

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: error.status,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve the current user.",
      },
      {
        status: 500,
      },
    );
  }
}
