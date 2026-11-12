import "server-only";

import type { ApiResponse } from "@/features/auth/types/auth.types";
import type {
  ProfileFilesData,
  ProfileActivitiesPagination,
  ProfileTasksPagination,
} from "@/features/profile/types/profile.types";

const BASE_URL = process.env.PUBLIC_NEXT_BASEURL;

export class ProfileApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ProfileApiError";
  }
}

function getApiUrl(endpoint: string, params?: Record<string, string>): string {
  if (!BASE_URL) {
    throw new Error("PUBLIC_NEXT_BASEURL environment variable is missing.");
  }

  const url = new URL(endpoint, BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return url.toString();
}

async function authenticatedFetch<T>(
  endpoint: string,
  token: string,
  errorMessage: string,
  params?: Record<string, string>,
): Promise<T> {
  const response = await fetch(getApiUrl(endpoint, params), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const payload = (await response
    .json()
    .catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok || !payload || payload.success !== true) {
    throw new ProfileApiError(
      payload?.message ?? `${errorMessage} Status: ${response.status}.`,
      response.status,
    );
  }

  return payload.data;
}

export const profileService = {
  async updateProfile(
    token: string,
    formData: FormData,
  ): Promise<ApiResponse<unknown>> {
    const response = await fetch(getApiUrl("/api/v1/auth/profile"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    });

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<unknown>
      | null;

    if (!response.ok || !payload || payload.success !== true) {
      throw new ProfileApiError(
        payload?.message ?? `Failed to update profile. Status: ${response.status}.`,
        response.status,
      );
    }

    return payload;
  },

  async getFiles(token: string, page = 1): Promise<ProfileFilesData> {
    return authenticatedFetch<ProfileFilesData>(
      "/api/v1/auth/profile/files",
      token,
      "Failed to retrieve profile files.",
      { page: String(page) },
    );
  },

  async getActivities(token: string): Promise<ProfileActivitiesPagination> {
    return authenticatedFetch<ProfileActivitiesPagination>(
      "/api/v1/activities",
      token,
      "Failed to retrieve activities.",
      { per_page: "10" },
    );
  },

async getTasks(token: string): Promise<ProfileTasksPagination> {
  return authenticatedFetch<ProfileTasksPagination>(
    "/api/v1/auth/profile/tasks",
    token,
    "Failed to retrieve profile tasks.",
    { page: "1" },
  );
  },
};

