
"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import SummaryPanel from "@/features/meetings/components/details/SummaryPanel";
import type { MeetingSummary } from "@/features/meetings/types/meeting.types";

type TabKey = "summary" | "note" | "comments";

const TABS: { key: TabKey; label: string }[] = [
  { key: "summary", label: "AI Summary" },
  { key: "note", label: "Note" },
  { key: "comments", label: "Comments" },
];

interface MeetingTabsProps {
  summary: MeetingSummary | null;
  notes?: ReactNode;
  comments?: ReactNode;
}

export default function MeetingTabs({
  summary,
  notes,
  comments,
}: MeetingTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("summary");

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div
        className="flex gap-2 p-4"
        role="tablist"
        aria-label="Meeting details tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-primary text-primary-foreground"
                : "border border-border text-foreground hover:bg-muted"
            }`}
            role="tab"
            aria-selected={activeTab === tab.key}
            aria-controls="meeting-tab-panel"
            id={`tab-${tab.key}`}
            tabIndex={activeTab === tab.key ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className="mt-4"
        role="tabpanel"
        id="meeting-tab-panel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === "summary" && (
          <SummaryPanel summary={summary} />
        )}

        {activeTab === "note" && (
          notes ?? <p className="p-4 text-sm text-muted-foreground">No notes yet.</p>
        )}

        {activeTab === "comments" && (
          comments ?? <p className="p-4 text-sm text-muted-foreground">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
