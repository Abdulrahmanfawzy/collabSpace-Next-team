"use client";

import { useState } from "react";
import { Bell, CheckCheck, Check, Trash2 } from "lucide-react";
import type { NotificationItem } from "@/api/notifications.api";
import {
  deleteNotification,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/actions/notifications.actions";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default function NotificationBell({
  items: initialItems,
  unreadCount: initialUnreadCount,
}: {
  items: NotificationItem[];
  unreadCount: number;
}) {
  const [items, setItems] = useState(initialItems);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [busyId, setBusyId] = useState<string | number | "all" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasUnread = unreadCount > 0;

  async function handleMarkAllRead() {
    setBusyId("all");
    setError(null);
    const result = await markAllNotificationsRead();
    if (result.success) {
      setItems([]);
      setUnreadCount(0);
    } else setError(result.message);
    setBusyId(null);
  }

  async function handleMarkRead(item: NotificationItem) {
    setBusyId(item.id);
    setError(null);
    const result = await markNotificationRead(item.id);
    if (result.success) {
      setItems((current) => current.filter((notification) => notification.id !== item.id));
      setUnreadCount((count) => Math.max(0, count - 1));
    } else setError(result.message);
    setBusyId(null);
  }

  async function handleDelete(item: NotificationItem) {
    setBusyId(item.id);
    setError(null);
    const result = await deleteNotification(item.id);
    if (result.success) {
      setItems((current) => current.filter((notification) => notification.id !== item.id));
      if (!item.is_read) setUnreadCount((count) => Math.max(0, count - 1));
    } else setError(result.message);
    setBusyId(null);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative size-11 rounded-full"
          aria-label={hasUnread ? "Notifications (unread)" : "Notifications"}
        >
          <Bell className="size-6" />
          {hasUnread && <span className="absolute right-2.5 top-2 size-2.5 rounded-full bg-red-500 ring-2 ring-white" />}
          {hasUnread && <span className="sr-only">{unreadCount} unread</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(24rem,calc(100vw-2rem))] p-0">
        <PopoverHeader className="border-b px-4 py-3">
          <PopoverTitle>Notifications</PopoverTitle>
          <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              disabled={busyId !== null}
              className="h-7 self-start px-2 text-xs"
            >
              <CheckCheck className="mr-1 size-3.5" /> Mark all as read
            </Button>
          )}
        </PopoverHeader>
        <div className="max-h-96 overflow-y-auto">
          {error && <p role="alert" className="px-4 pt-3 text-xs text-destructive">{error}</p>}
          {items.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">You’re all caught up.</p>
          ) : (
            items.map((item) => (
              <article key={item.id} className="flex items-start gap-3 border-b px-4 py-3 last:border-b-0">
                <span className={`mt-1.5 size-2 shrink-0 rounded-full ${item.is_read ? "bg-transparent" : "bg-indigo-600"}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  {item.message && <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{item.message}</p>}
                  {item.created_at && <time className="mt-1 block text-[11px] text-muted-foreground">{formatDate(item.created_at)}</time>}
                </div>
                <div className="flex shrink-0">
                  {!item.is_read && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Mark as read"
                      title="Mark as read"
                      disabled={busyId !== null}
                      onClick={() => handleMarkRead(item)}
                    >
                      <Check className="size-4" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Delete notification"
                    title="Delete notification"
                    disabled={busyId !== null}
                    onClick={() => handleDelete(item)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </article>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
