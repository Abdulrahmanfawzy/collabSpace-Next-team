
"use client";

import { useState } from "react";
import SummaryPanel from "@/features/meetings/components/details/SummaryPanel";

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
      <div className="flex gap-2   p-4">
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

      <div className="mt-4">
        {activeTab === "summary" && (
          <SummaryPanel keyPoints={keyPoints} />
        )}

        {activeTab === "note" &&
          (notes ?? <p>No notes yet.</p>)}

        {activeTab === "comments" &&
          (comments ?? <p>No comments yet.</p>)}
      </div>
    </div>
  );
}
