
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Pencil,
  CheckCircle2,
  Clock3,
  CalendarDays,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/date";

import type {
  AuthUser,
  ProfileStats,
} from "@/features/auth/types/auth.types";

const tabs = [
  { label: "Overview", href: "/profile" },
  { label: "Tasks", href: "/profile/tasks" },
  { label: "Files", href: "/profile/files" },
];

interface ProfileHeaderProps {
  user: AuthUser;
  stats: ProfileStats;
}

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

        <div className="flex h-full w-full items-center justify-end">
          <div
            className={cn(
              "flex size-15 flex-col items-center justify-center rounded-full",
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

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export function ProfileHeader({
  user,
  stats,
}: ProfileHeaderProps) {
  const pathname = usePathname();

  const statCards = [
    {
      id: "completed-tasks",
      label: "Completed Tasks",
      value: String(stats.completed_tasks ?? 0),
      icon: CheckCircle2,
    },
    {
      id: "hours-worked",
      label: "Hours Worked",
      value: String(stats.hours_worked ?? 0),
      icon: Clock3,
    },
  ];

  const fullName = user.name || "User";

  return (
    <section className="p-5 md:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative w-fit">
          <Avatar className="size-23 border-2 border-primary/10 md:size-24">
            <AvatarImage
              src={user.avatar_url ?? undefined}
              alt={fullName}
            />

            <AvatarFallback>
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>

          <Link
            href="/edit"
            aria-label="Edit profile"
            className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center
              rounded-full border-0 bg-bg-light text-primary shadow-sm transition
              hover:bg-primary hover:text-white"
          >
            <Pencil className="size-4" />
          </Link>
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-semibold text-text-primary md:text-2xl">
            {fullName}
          </h1>

          <p className="mt-1 flex text-sm text-text-body">
            {user.job_title || "No job title"}
            &nbsp;
            <CalendarDays className="size-5" />
            &nbsp;
            Joined {formatDate(user.created_at)}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {statCards.map((stat, index) => (
            <StatCard
              key={stat.id}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              iconColor={
                index === 0
                  ? "text-primary"
                  : "text-support-violet"
              }
              iconBgColor={
                index === 0
                  ? "bg-primary-50"
                  : "bg-support-violet-light"
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
