"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UserNav,
  type HeaderUser,
} from "@/components/layout/Navbar/components/Usernav";

type HeaderActionsProps = {
  /** Pass a user to show the bell + user component. Leave empty to show Sign in / Sign up. */
  user?: HeaderUser | null;
  hasUnread?: boolean;
  signInHref?: string;
  signUpHref?: string;
  onSearchChange?: (value: string) => void;
  onBellClick?: () => void;
  onSignOut?: () => void;
};

export function HeaderActions({
  user,
  hasUnread = true,
  signInHref = "/sign-in",
  signUpHref = "/sign-up",
  onSearchChange,
  onBellClick,
  onSignOut,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-4 sm:gap-8">
      <div className="relative w-full max-w-50">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-900" />
        <Input
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="h-12 rounded-full border-0 bg-[#f6f7fa] pl-12 text-base shadow-none focus-visible:ring-2 focus-visible:ring-[#3b3bf5]"
        />
      </div>

      {user ? (
        <div className="flex items-center gap-3 sm:gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBellClick}
            className="relative size-11 rounded-full"
            aria-label={hasUnread ? "Notifications (unread)" : "Notifications"}
          >
            <Bell className="size-6" />
            {hasUnread && (
              <span className="absolute right-2.5 top-2 size-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </Button>
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
