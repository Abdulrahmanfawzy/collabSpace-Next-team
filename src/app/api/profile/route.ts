import { NextResponse } from "next/server";

import { getBackendToken } from "@/auth";
import {
  ProfileApiError,
  profileService,
} from "@/features/profile/services/profile.service";

export async function POST(request: Request) {
  const token = await getBackendToken();

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Please sign in to update your profile." },
      { status: 401 },
    );
  }

  try {
    const formData = await request.formData();
    const response = await profileService.updateProfile(token, formData);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof ProfileApiError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { success: false, message: "Unable to update your profile. Please try again." },
      { status: 500 },
    );
  }
}
