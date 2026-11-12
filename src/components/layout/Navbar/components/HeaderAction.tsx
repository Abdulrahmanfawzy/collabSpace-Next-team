"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UserNav,
  type HeaderUser,
} from "@/components/layout/Navbar/components/Usernav";
import NotificationBell from "@/components/layout/Navbar/components/NotificationBell";
import type { NotificationItem } from "@/api/notifications.api";

type HeaderActionsProps = {
  /** Pass a user to show the bell + user component. Leave empty to show Sign in / Sign up. */
  user?: HeaderUser | null;
  notifications?: NotificationItem[];
  unreadCount?: number;
  signInHref?: string;
  signUpHref?: string;
  onSearchChange?: (value: string) => void;
  onSignOut?: () => void;
};

export function HeaderActions({
  user,
  notifications = [],
  unreadCount = 0,
  signInHref = "/sign-in",
  signUpHref = "/sign-up",
  onSearchChange,
  onSignOut,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center sm:gap-8">
      <div className="relative w-full max-w-60">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-900" />
        <Input
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="h-12 rounded-full border-0 bg-light pl-12 text-base shadow-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300"
        />
      </div>

      {user ? (
        <div className="flex items-center gap-3 sm:gap-6">
          <NotificationBell items={notifications} unreadCount={unreadCount} />
          <UserNav user={user} onSignOut={onSignOut} />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="rounded-full px-5">
            <Link href={signInHref}>Sign in</Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-primary-light px-5 hover:bg-[#3333e0]"
          >
            <Link href={signUpHref}>Sign up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
