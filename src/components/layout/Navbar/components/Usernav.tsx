"use client";

import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type HeaderUser = {
  name: string;
  role: string;
  email?: string;
  avatar?: string;
};

type UserNavProps = {
  user: HeaderUser;
  onSignOut?: () => void;
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}



export function UserNav({ user, onSignOut }: UserNavProps) {
    console.log(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#3b3bf5] focus-visible:ring-offset-2">
        <div className="hidden text-right leading-tight sm:block">
          <p className="text-[15px] font-bold text-neutral-900">{user.name}</p>
          <p className="text-sm font-semibold text-neutral-500">{user.role}</p>
        </div>
        <Avatar className="size-11">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-neutral-200 text-sm font-semibold">
            {initials(user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-semibold">{user.name}</p>
          {user.email && (
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="cursor-pointer">
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}