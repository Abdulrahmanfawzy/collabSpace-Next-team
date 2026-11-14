"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UserNav,
  type HeaderUser,
} from "@/components/layout/Navbar/components/Usernav";
import NotificationBell from "@/components/layout/Navbar/components/NotificationBell";
import SearchResults from "@/components/layout/Navbar/components/Searchnav";
import type { NotificationItem } from "@/api/notifications.api";
import { useSearch } from "@/hooks/use-search";

type HeaderActionsProps = {
  /** Pass a user to show the bell + user component. Leave empty to show Sign in / Sign up. */
  user?: HeaderUser | null;
  notifications?: NotificationItem[];
  unreadCount?: number;
  signInHref?: string;
  signUpHref?: string;
  onSignOut?: () => void;
};

export function HeaderActions({
  user,
  notifications = [],
  unreadCount = 0,
  signInHref = "/sign-in",
  signUpHref = "/sign-up",
  onSignOut,
}: HeaderActionsProps) {
  const {
    query,
    setQuery,
    data,
    isLoading,
    isError,
    errorMessage,
    isOpen,
    clearSearch,
  } = useSearch();

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        clearSearch();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clearSearch]);

  return (
    <div className="flex items-center sm:gap-8">
      <div ref={searchContainerRef} className="relative w-full max-w-64">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400" />
        <Input
          type="search"
          placeholder="Search projects, tasks, users..."
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 rounded-full border border-neutral-200/60 bg-neutral-100/80 pl-11 pr-9 text-sm shadow-none focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-200/60 hover:text-neutral-700"
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </button>
        )}
        <SearchResults
          data={data}
          isLoading={isLoading}
          isError={isError}
          errorMessage={errorMessage}
          isOpen={isOpen}
          onSelect={clearSearch}
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
