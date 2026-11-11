
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ChatTabType = "inbox" | "projects";

interface ChatTabsProps {
  activeTab: ChatTabType;
  onTabChange: (tab: ChatTabType) => void;
}

export default function ChatTabs({
  activeTab,
  onTabChange,
}: ChatTabsProps) {
  return (
    <div className="flex flex-col gap-1 px-4 py-2">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-base font-semibold",
          activeTab === "inbox" && "bg-muted text-foreground"
        )}
        onClick={() => onTabChange("inbox")}
      >
        Inbox
      </Button>

      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-base font-semibold",
          activeTab === "projects" && "bg-muted text-foreground"
        )}
        onClick={() => onTabChange("projects")}
      >
        Project Chats
      </Button>
    </div>
  );
}
