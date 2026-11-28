"use client";

import { setApiToken } from "@/api/apiClient";

interface ApiTokenProviderProps {
  token: string | null;
}

/**
 * Keeps the client API client in sync with the backend token from the
 * authenticated server session. Rendered before any data-fetching children
 * so their requests are authenticated on the first render.
 */
export function ApiTokenProvider({ token }: ApiTokenProviderProps) {
  setApiToken(token);
  return null;
}
