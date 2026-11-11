import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { authService, AuthApiError } from "@/features/auth/services/auth.service";


export async function GET() {
  const session = await auth();
  const token = session?.backendToken;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthenticated.",
      },
      { status: 401 },
    );
  }

  try {
    const response = await authService.me(token);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof AuthApiError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: error.status },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve the current user.",
      },
      { status: 500 },
    );
  }
}
