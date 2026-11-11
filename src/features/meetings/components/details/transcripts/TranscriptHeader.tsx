
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TranscriptHeader() {
  const [language, setLanguage] = useState("en");

  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-lg font-semibold text-foreground">
        Meeting Transcripts
      </h2>

      <div className="relative">
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          aria-label="Transcript language"
          className="h-9 appearance-none rounded-full border border-border bg-background py-1 pl-3 pr-8 text-xs text-muted-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>
  );
}
