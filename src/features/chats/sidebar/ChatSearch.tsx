
"use client";

import { Search, X } from "lucide-react";

interface ChatSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ChatSearch({
  value,
  onChange,
}: ChatSearchProps) {
  return (
    <div className="px-4 py-3">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search conversations..."
          aria-label="Search conversations"
          className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
