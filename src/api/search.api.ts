import "server-only";
import { getAccessToken } from "@/auth";
import type { SearchApiResponse, SearchData } from "@/types/search.types";

export type { SearchApiResponse, SearchData } from "@/types/search.types";

function getBaseUrl(): string {
  const rawUrl =
    process.env.API ||
    process.env.PUBLIC_NEXT_BASEURL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "";
  const cleaned = rawUrl.trim().replace(/^['"]|['"]$/g, "").replace(/\/+$/, "");
  if (!cleaned) {
    throw new Error("API base URL is not configured. Set API or PUBLIC_NEXT_BASEURL in your environment.");
  }
  return cleaned;
}

export async function searchApi(
  query: string,
  explicitToken?: string
): Promise<SearchData> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      query: "",
      total: 0,
      results: {
        projects: { total: 0, items: [] },
        tasks: { total: 0, items: [] },
        meetings: { total: 0, items: [] },
        files: { total: 0, items: [] },
        teams: { total: 0, items: [] },
        users: { total: 0, items: [] },
      },
    };
  }

  let token = explicitToken;
  if (!token) {
    try {
      token = (await getAccessToken()) ?? undefined;
    } catch {
      // In non-request contexts or if getAccessToken fails
    }
  }
  if (!token) {
    token = process.env.token;
  }

  const baseUrl = getBaseUrl();
  const searchParams = new URLSearchParams({ q: trimmed });
  const url = `${baseUrl}/api/v1/search?${searchParams.toString()}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const payload: SearchApiResponse = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    const errorMsg =
      payload?.message || `Search failed with status ${response.status}`;
    console.error("Search API error:", errorMsg, { url, status: response.status });
    throw new Error(errorMsg);
  }

  return payload.data;
}

export default searchApi;
