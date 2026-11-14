"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Search, X, ArrowLeft, Loader2 } from "lucide-react";

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

  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Focus input when mobile search opens
  useEffect(() => {
    if (isMobileSearchActive) {
      setTimeout(() => mobileInputRef.current?.focus(), 50);
    }
  }, [isMobileSearchActive]);

  // Close desktop dropdown when clicking outside
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

  const handleCloseMobileSearch = () => {
    setIsMobileSearchActive(false);
    clearSearch();
  };

  return (
    <div className="flex items-center gap-2 sm:gap-5">
      {/* ================= DESKTOP SEARCH (sm+) ================= */}
      <div ref={searchContainerRef} className="relative hidden sm:block w-48 md:w-60 lg:w-72">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type="search"
          placeholder="Search projects, tasks, users..."
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 rounded-full border border-neutral-200/80 bg-neutral-100/80 pl-9 pr-8 text-xs shadow-none focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-200/60 hover:text-neutral-700"
            aria-label="Clear search"
          >
            <X className="size-3" />
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

      {/* ================= MOBILE SEARCH TRIGGER (< sm) ================= */}
      <button
        type="button"
        onClick={() => setIsMobileSearchActive(true)}
        className="flex sm:hidden items-center justify-center size-9 rounded-full bg-light text-neutral-700 hover:bg-neutral-200/70 transition-colors"
        aria-label="Open search"
      >
        <Search className="size-4" />
      </button>

      {/* ================= MOBILE FULLSCREEN SEARCH MODAL (< sm) ================= */}
      {isMobileSearchActive && (
        <div className="sm:hidden fixed inset-0 z-[120] bg-white flex flex-col animate-in fade-in-0 duration-150">
          {/* Top Search Bar */}
          <div className="flex items-center gap-2 border-b border-neutral-200/80 px-3 py-3">
            <button
              type="button"
              onClick={handleCloseMobileSearch}
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-100"
              aria-label="Close search"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              <input
                ref={mobileInputRef}
                type="search"
                placeholder="Search projects, tasks, users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 w-full rounded-full border border-neutral-200 bg-neutral-100/80 pl-9 pr-8 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-primary"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            {isLoading && (
              <Loader2 className="size-4 animate-spin text-primary-light shrink-0" />
            )}
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-hidden relative">
            <SearchResults
              data={data}
              isLoading={isLoading}
              isError={isError}
              errorMessage={errorMessage}
              isOpen={true}
              isMobileModal={true}
              onSelect={handleCloseMobileSearch}
            />
          </div>
        </div>
      )}

      {/* ================= USER / AUTH ACTIONS ================= */}
      {user ? (
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <NotificationBell items={notifications} unreadCount={unreadCount} />
          <UserNav user={user} onSignOut={onSignOut} />
        </div>
      ) : (
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Button asChild variant="ghost" size="sm" className="rounded-full px-3 sm:px-5 text-xs sm:text-sm">
            <Link href={signInHref}>Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="rounded-full bg-primary-light px-3 sm:px-5 hover:bg-[#3333e0] text-xs sm:text-sm"
          >
            <Link href={signUpHref}>Sign up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
