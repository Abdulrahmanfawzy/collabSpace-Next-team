"use client";

import { useState } from "react";

import TranscriptHeader from "@/features/meetings/components/details/transcripts/TranscriptHeader";
import TranscriptSearch from "@/features/meetings/components/details/transcripts/TranscriptSearch";
import TranscriptMeta from "@/features/meetings/components/details/transcripts/TranscriptMeta";
import {  transcripts } from "@/features/meetings/data/data";
export default function MeetingTranscripts() {
  const [search, setSearch] = useState("");

  return (
    <section className="w-full space-y-4 rounded-2xl border border-border p-4">
      <TranscriptHeader />

      <TranscriptSearch
        value={search}
        onChange={setSearch}
      />
      {transcripts.map((transcript) => (
        <TranscriptMeta
          key={transcript.id}
          speaker={transcript.speaker}
          avatar={transcript.avatar}
          timestamp={transcript.timestamp}
          text={transcript.text}
          
        />
      ))}
    </section>
  );
}