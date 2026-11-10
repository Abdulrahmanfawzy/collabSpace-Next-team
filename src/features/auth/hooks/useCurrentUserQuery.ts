"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { authQueryKeys } from "@/features/auth/constants/auth.query-keys";

import type {
  ApiResponse,
  CurrentUserData,
} from "@/features/auth/types/auth.types";

class CurrentUserError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "CurrentUserError";
    this.status = status;
  }
}

async function fetchCurrentUser(): Promise<CurrentUserData> {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiResponse<CurrentUserData>
    | {
        success: false;
        message: string;
      }
    | null;

  if (!response.ok || !payload || payload.success !== true) {
    throw new CurrentUserError(
      payload?.message ?? "Unable to retrieve current user.",
      response.status,
    );
  }

  return payload.data;
}

export function useCurrentUserQuery() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: authQueryKeys.currentUser,

    queryFn: fetchCurrentUser,

    staleTime: 60 * 1000,

    retry: false,
  });

  useEffect(() => {
    if (query.error instanceof CurrentUserError && query.error.status === 401) {
      queryClient.removeQueries({
        queryKey: authQueryKeys.currentUser,
      });

      router.replace("/login");
    }
  }, [query.error, queryClient, router]);

  return query;
}
