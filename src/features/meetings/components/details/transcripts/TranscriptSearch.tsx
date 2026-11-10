"use client";

import { Search } from "lucide-react";

interface TranscriptSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TranscriptSearch({
  value,
  onChange,
}: TranscriptSearchProps) {
  return (
    <div className="relative w-full">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Transcript"
        aria-label="Search transcript"
        className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}