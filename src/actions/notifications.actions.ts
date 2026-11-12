"use server";

import { getAccessToken } from "@/auth";

type NotificationActionResult = { success: true } | { success: false; message: string };

async function mutateNotification(
  path: string,
  method: "POST" | "DELETE",
): Promise<NotificationActionResult> {
  const accessToken = await getAccessToken();
  if (!accessToken) return { success: false, message: "Your session has expired. Please sign in again." };

  const baseUrl = process.env.API?.trim().replace(/^['"]|['"]$/g, "").replace(/\/+$/, "");
  if (!baseUrl) return { success: false, message: "Notifications API is not configured." };

  try {
    const response = await fetch(`${baseUrl}/api/v1/notifications/${path}`, {
      method,
      headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      return { success: false, message: payload?.message ?? `Notification request failed (${response.status}).` };
    }
    return { success: true };
  } catch {
    return { success: false, message: "Could not update the notification. Please try again." };
  }
}

export async function markAllNotificationsRead(): Promise<NotificationActionResult> {
  return mutateNotification("mark-all-read", "POST");
}

export async function markNotificationRead(id: string | number): Promise<NotificationActionResult> {
  return mutateNotification(`${encodeURIComponent(String(id))}/read`, "POST");
}

export async function deleteNotification(id: string | number): Promise<NotificationActionResult> {
  return mutateNotification(encodeURIComponent(String(id)), "DELETE");
}
