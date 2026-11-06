"use client";

import { useState } from "react";

import TranscriptHeader from "./TranscriptHeader";
import TranscriptSearch from "./TranscriptSearch";

export default function MeetingTranscripts() {
  const [search, setSearch] = useState("");

  return (
    <section className="w-full space-y-4 rounded-2xl border border-border p-4">
      <TranscriptHeader />

      <TranscriptSearch
        value={search}
        onChange={setSearch}
      />
    </section>
  );
}