"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { MainNavItem } from "@/types/Types";
import { canViewReports } from "@/features/auth/permissions/hasPermission";
import type { UserRole } from "@/features/auth/types/auth.types";

const links: MainNavItem[] = [
  { label: "Dashboard", href: "/", active: "Dashboard" },
  { label: "Projects", href: "/projects", active: "Projects" },
  { label: "Tasks", href: "/tasks", active: "Tasks" },
  { label: "Chats", href: "/chats", active: "Chats" },
  { label: "Meetings", href: "/meetings", active: "Meetings" },
  { label: "Reports", href: "/reports", active: "Reports" },
];

export default function MainNav({ roles = [] }: { roles?: readonly UserRole[] }) {
  const pathname = usePathname();
  const visibleLinks = links.filter(
    ({ href }) => href !== "/reports" || canViewReports(roles),
  );


  return (
    <NavigationMenu className="w-full max-w-5xl justify-start">
      <NavigationMenuList
        className={cn(
          "flex w-full flex-wrap justify-start bg-light gap-1",
          "rounded-full p-1 sm:gap-2 sm:p-2",
        )}
      >
        {visibleLinks.map(({ label, href }) => {

          const active =
            pathname === href ||
            pathname.startsWith(`${href}/`) ||
            (pathname === "/" && href === "/dashboard");

          return (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink asChild active={active}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center !rounded-full px-4 text-xs font-medium",
                    active
                      ? "!bg-primary-light !text-white hover:!bg-primary-blue-700"
                      : "!bg-transparent !text-neutral-900 hover:!bg-black/5"
                  )}>
                  {label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
