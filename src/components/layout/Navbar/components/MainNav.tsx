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

const links: MainNavItem[] = [
  { label: "Dashboard", href: "/", active: "Dashboard" },
  { label: "Projects", href: "/projects", active: "Projects" },
  { label: "Tasks", href: "/tasks", active: "Tasks" },
  { label: "Chats", href: "/chats", active: "Chats" },
  { label: "Meetings", href: "/meetings", active: "Meetings" },
  { label: "Reports", href: "/reports", active: "Reports" },
];

export default function MainNav() {
  const pathname = usePathname();


  return (
    <NavigationMenu className="w-full max-w-5xl justify-start">
      <NavigationMenuList
        className={cn(
          "flex w-full flex-wrap justify-start gap-1",
          "rounded-full bg-[#f6f7fa] p-1.5 sm:gap-2 sm:p-2",
        )}
      >
        {links.map(({ label, href }) => {
           
          const active =
            pathname === href ||
            pathname.startsWith(`${href}/`) ||
            (pathname === "/" && href === "/dashboard");
            console.log({
                label,
                href,
                pathname,
                active
              })
          return (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink asChild active={active}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-11 items-center !rounded-full px-5 text-[15px] font-medium",
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
