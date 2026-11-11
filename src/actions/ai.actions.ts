"use server";

import { getBackendToken } from "@/auth";

const getApiBaseUrl = () => {
  const baseUrl = process.env.API?.trim().replace(/^['"]|['"]$/g, "").replace(/\/+$/, "");
  if (!baseUrl) throw new Error("AI API is not configured. Set the API environment variable.");
  return baseUrl;
};

export async function askAIAction(message: string): Promise<{ answer: string }> {
  const prompt = message.trim();
  if (!prompt) throw new Error("Enter a question before sending.");

  const token = await getBackendToken();
  if (!token) throw new Error("Your session has expired. Please sign in again.");

  const response = await fetch(`${getApiBaseUrl()}/api/v1/ai/ask`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: prompt }),
    cache: "no-store",
  });

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const errorPayload = payload as { message?: string; error?: string } | null;
    throw new Error(errorPayload?.message ?? errorPayload?.error ?? "AI could not answer. Please try again.");
  }

  const data = payload as { answer?: unknown; message?: unknown; data?: { answer?: unknown; message?: unknown } } | null;
  const answer = data?.answer ?? data?.data?.answer ?? data?.message ?? data?.data?.message;
  if (typeof answer !== "string") throw new Error("The AI response did not include an answer.");
  return { answer };
}
