"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import SummaryPanel from "./SummaryPanel";

type TabKey = "summary" | "note" | "comments";

const TABS: { key: TabKey; label: string }[] = [
  { key: "summary", label: "AI Summary" },
  { key: "note", label: "Note" },
  { key: "comments", label: "Comments" },
];

interface MeetingTabsProps {
  keyPoints: string[];
  notes?: React.ReactNode;
  comments?: React.ReactNode;
}

export default function MeetingTabs({
  keyPoints,
  notes,
  comments,
}: MeetingTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("summary");

  return (
    <div className="w-full">
      {/* Tab buttons */}
      <div role="tablist" className="flex items-center gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-t-md px-3 py-1.5 text-xs transition-colors",
                isActive
                  ? "bg-muted/50 font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div role="tabpanel" className="mt-0">
        {activeTab === "summary" && <SummaryPanel keyPoints={keyPoints} />}

        {activeTab === "note" &&
          (notes ?? (
            <p className="rounded-2xl bg-muted/50 p-6 text-sm text-muted-foreground">
              No notes yet.
            </p>
          ))}

        {activeTab === "comments" &&
          (comments ?? (
            <p className="rounded-2xl bg-muted/50 p-6 text-sm text-muted-foreground">
              No comments yet.
            </p>
          ))}
      </div>
    </div>
  );
}
