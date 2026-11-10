"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Pencil,
  CheckCircle2,
  FolderKanban,
  Clock3,
  CalendarDays,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { profileUser, profileStats, } from "../data/mock-profile";

const tabs = [
  { label: "Overview", href: "/profile" },
  { label: "Tasks", href: "/profile/tasks" },
  { label: "Files", href: "/profile/files" },
];

function StatCard({
  icon: Icon,
  label,
  value,
  iconColor,
  iconBgColor,
}: {
  icon: typeof CheckCircle2;
  label: string;
  value: string;
  iconColor: string;
  iconBgColor: string;
}) {
  return (
    <article className="rounded-xl border border-border bg-white p-5">
      <div className="grid grid-cols-2 items-center justify-between">
        <div>
          <p className="text-sm text-text-body">{label}</p>
          <p className="mt-4 text-2xl font-semibold text-text-primary">
            {value}
          </p>
        </div>
        <div className="w-full h-full flex items-center justify-end">
          <div
            className={cn(
              "flex flex-col items-center justify-center size-15 rounded-full",
              iconBgColor,
            )}
          >
            <Icon className={cn("size-10", iconColor)} />
          </div>
        </div>
      </div>
    </article>
  );
}


export function ProfileHeader() {
  const pathname = usePathname();
  const icons = [CheckCircle2, Clock3, FolderKanban];

  return (
    <section className=" p-5 md:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative w-fit">
          <Avatar className="size-23 border-2 border-primary/10 md:size-24">
            <AvatarImage src={profileUser.avatar} alt={profileUser.fullName} />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>

          <Link
            href="/edit"
            aria-label="Edit profile"
            className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center
             rounded-full border-0 text-primary bg-bg-light shadow-sm transition
              hover:bg-primary hover:text-white"
          >
            <Pencil className="size-4" />
          </Link>
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-semibold text-text-primary md:text-2xl">
            {profileUser.fullName}
          </h1>

          <p className="flex mt-1 text-sm text-text-body">
            {profileUser.jobTitle} &nbsp;
            <CalendarDays className="size-5" /> &nbsp; Joined
            {profileUser.joinDate}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {profileStats.map((stat, index) => (
            <StatCard
              key={stat.id}
              icon={icons[index]}
              label={stat.label}
              value={stat.value}
              iconColor={index === 0 ? "text-primary" : "text-support-violet"}
              iconBgColor={
                index === 0 ? "bg-primary-50" : "bg-support-violet-light"
              }
            />
          ))}
        </div>
      </div>

      <nav
        aria-label="Profile navigation"
        className="mt-7 flex gap-7 overflow-x-auto border-b border-border"
      >
        {tabs.map((tab) => {
          const active =
            tab.href === "/profile"
              ? pathname === "/profile"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative shrink-0 pb-3 text-sm font-medium transition",
                active
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                  : "text-text-body hover:text-primary",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
