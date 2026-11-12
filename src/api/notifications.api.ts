import "server-only";

export type NotificationItem = {
  id: string | number;
  title: string;
  message: string;
  created_at?: string | null;
  is_read: boolean;
};

type RawNotification = Record<string, unknown>;

function normalizeNotification(item: RawNotification, index: number): NotificationItem {
  const isRead =
    item.is_read === true || item.is_read === 1 || item.is_read === "1" ||
    item.read_at != null || item.status === "read";
  return {
    id: (item.id as string | number | undefined) ?? index,
    title: String(item.title ?? item.subject ?? item.type ?? "Notification"),
    message: String(item.message ?? item.body ?? item.description ?? ""),
    created_at: typeof item.created_at === "string" ? item.created_at : null,
    is_read: isRead,
  };
}

export default async function getNotifications(accessToken: string): Promise<NotificationItem[]> {
  const baseUrl = process.env.API?.trim().replace(/^['"]|['"]$/g, "").replace(/\/+$/, "");
  if (!baseUrl) throw new Error("Notifications API is not configured. Set the API environment variable.");

  const searchParams = new URLSearchParams({ per_page: "15", status: "unread" });
  const response = await fetch(`${baseUrl}/api/v1/notifications?${searchParams.toString()}`, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(`Failed to fetch notifications (${response.status}).`);
  }

  const data = payload?.data;
  let items: unknown = Array.isArray(data)
    ? data
    : data?.data ?? data?.items ?? data?.notifications ?? payload?.notifications ?? [];
  if (!Array.isArray(items) && items && typeof items === "object" && Array.isArray((items as { data?: unknown }).data)) {
    items = (items as { data: unknown[] }).data;
  }
  if (!Array.isArray(items)) return [];
  return items.map((item: RawNotification, index: number) => normalizeNotification(item, index));
}

export async function getUnreadNotificationCount(accessToken: string): Promise<number> {
  const baseUrl = process.env.API?.trim().replace(/^['"]|['"]$/g, "").replace(/\/+$/, "");
  if (!baseUrl) throw new Error("Notifications API is not configured. Set the API environment variable.");

  const response = await fetch(`${baseUrl}/api/v1/notifications/unread-count`, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`Failed to fetch unread notification count (${response.status}).`);

  const count =
    payload?.data?.unread_count ?? payload?.data?.count ??
    (typeof payload?.data === "number" ? payload.data : undefined) ??
    payload?.unread_count ?? payload?.count;
  return Number.isFinite(Number(count)) ? Math.max(0, Number(count)) : 0;
}
