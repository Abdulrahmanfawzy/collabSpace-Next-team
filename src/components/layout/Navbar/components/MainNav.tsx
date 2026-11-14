"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  MessageSquare,
  Video,
  BarChart3,
  UserRound,
  Pencil,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { MainNavItem } from "@/types/Types";
import {
  canAccessChats,
  canAccessMeetings,
  canViewReports,
  hasPermission,
} from "@/features/auth/permissions/hasPermission";
import type { UserRole } from "@/features/auth/types/auth.types";
import type { HeaderUser } from "@/components/layout/Navbar/components/Usernav";

interface NavLinkWithIcon extends MainNavItem {
  icon: React.ComponentType<{ className?: string }>;
}

const links: NavLinkWithIcon[] = [
  { label: "Dashboard", href: "/", active: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", active: "Projects", icon: FolderKanban },
  { label: "Tasks", href: "/tasks", active: "Tasks", icon: CheckSquare },
  { label: "Chats", href: "/chats", active: "Chats", icon: MessageSquare },
  { label: "Meetings", href: "/meetings", active: "Meetings", icon: Video },
  { label: "Reports", href: "/reports", active: "Reports", icon: BarChart3 },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

interface MainNavProps {
  roles?: readonly UserRole[];
  user?: HeaderUser | null;
  onSignOut?: () => void;
}

export default function MainNav({ roles = [], user, onSignOut }: MainNavProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    }

    if (isMobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  const visibleLinks = links.flatMap((link) => {
    if (link.href === "/") {
      return hasPermission(roles, "view_dashboard") ? [link] : [];
    }
    if (link.href === "/projects") {
      return hasPermission(roles, "view_projects") ? [link] : [];
    }
    if (link.href === "/tasks") {
      return hasPermission(roles, "view_tasks") ? [link] : [];
    }
    if (link.href === "/chats") return canAccessChats(roles) ? [link] : [];
    if (link.href === "/meetings") return canAccessMeetings(roles) ? [link] : [];
    if (link.href === "/reports" && canViewReports(roles)) {
      return roles.includes("Team Member")
        ? [{ ...link, label: "Reports", href: "/profile", active: "Reports" }]
        : [link];
    }
    return [];
  });

  const isLinkActive = (href: string) => {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`) ||
      (pathname === "/" && href === "/dashboard")
    );
  };

  return (
    <div ref={mobileMenuRef} className="relative flex items-center">
      {/* Mobile Hamburger Toggle Button (< lg) */}
      <button
        type="button"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        className="flex lg:hidden items-center justify-center size-9 rounded-full bg-light text-neutral-800 hover:bg-neutral-200/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Desktop Horizontal Menu (lg+) */}
      <div className="hidden lg:flex items-center">
        <NavigationMenu className="w-full justify-start">
          <NavigationMenuList
            className={cn(
              "flex flex-nowrap items-center bg-light gap-1 rounded-full p-1 sm:gap-1.5 sm:p-1.5",
              "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            )}
          >
            {visibleLinks.map(({ label, href }) => {
              const active = isLinkActive(href);

              return (
                <NavigationMenuItem key={href} className="shrink-0">
                  <NavigationMenuLink asChild active={active}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex h-9 items-center whitespace-nowrap !rounded-full px-4 text-xs font-medium transition-all",
                        active
                          ? "!bg-primary-light !text-white shadow-xs hover:!bg-primary-blue-700"
                          : "!bg-transparent !text-neutral-900 hover:!bg-black/5"
                      )}
                    >
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Dropdown Panel (< lg) */}
      {isMobileOpen && (
        <div className="lg:hidden absolute left-0 top-full z-50 mt-3 w-72 rounded-2xl border border-neutral-200/90 bg-white p-3 shadow-2xl backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-150">
          {/* Profile Section on Mobile */}
          {user ? (
            <div className="mb-3 rounded-xl bg-neutral-50 p-3 border border-neutral-100">
              <div className="flex items-center gap-3">
                <Avatar className="size-11 shrink-0">
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback className="bg-neutral-200 text-sm font-semibold">
                    {initials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-neutral-900">{user.name}</p>
                  <p className="truncate text-xs font-medium text-neutral-500">{user.role}</p>
                  {user.email && (
                    <p className="truncate text-[11px] text-neutral-400">{user.email}</p>
                  )}
                </div>
              </div>

              {/* Profile Links */}
              <div className="mt-3 flex flex-col gap-0.5 border-t border-neutral-200/60 pt-2">
                <Link
                  href="/profile"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-200/60 transition-colors"
                >
                  <UserRound className="size-3.5 text-neutral-500" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/edit"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-200/60 transition-colors"
                >
                  <Pencil className="size-3.5 text-neutral-500" />
                  <span>Edit profile</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileOpen(false);
                    onSignOut?.();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="size-3.5 text-red-500" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-3 flex items-center gap-2 border-b border-neutral-100 pb-3">
              <Button asChild variant="ghost" size="sm" className="w-1/2 rounded-full text-xs">
                <Link href="/login" onClick={() => setIsMobileOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button asChild size="sm" className="w-1/2 rounded-full bg-primary-light text-xs hover:bg-[#3333e0]">
                <Link href="/register" onClick={() => setIsMobileOpen(false)}>
                  Sign up
                </Link>
              </Button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="px-1 py-1">
            <p className="px-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Menu
            </p>
            <nav className="flex flex-col gap-1 max-h-[50vh] overflow-y-auto">
              {visibleLinks.map(({ label, href, icon: Icon }) => {
                const active = isLinkActive(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-colors",
                      active
                        ? "bg-primary-light text-white font-semibold shadow-xs"
                        : "text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900"
                    )}
                  >
                    <Icon className={cn("size-4 shrink-0", active ? "text-white" : "text-neutral-500")} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
