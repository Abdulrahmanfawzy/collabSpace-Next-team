
"use client";

import { useState } from "react";

import TranscriptHeader from "@/features/meetings/components/details/transcripts/TranscriptHeader";
import TranscriptSearch from "@/features/meetings/components/details/transcripts/TranscriptSearch";
import TranscriptMeta from "@/features/meetings/components/details/transcripts/TranscriptMeta";

export interface MeetingParticipant {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  job_title: string;
  attended: boolean;
}

type Props = {
  participants: MeetingParticipant[];
};

export default function MeetingTranscripts({
  participants,
}: Props) {
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(normalizedSearch) ||
      participant.job_title.toLowerCase().includes(normalizedSearch)
  );

  return (
    <section className="w-full space-y-4 rounded-2xl border border-border p-4">
      <TranscriptHeader />

      <TranscriptSearch
        value={search}
        onChange={setSearch}
      />

      {filteredParticipants.length > 0 ? (
        filteredParticipants.map((participant) => (
          <TranscriptMeta
            key={participant.id}
            speaker={participant.name}
            avatar={participant.avatar_url}
            timestamp={
              participant.attended ? "Attended" : "Absent"
            }
            text={participant.job_title}
          />
        ))
      ) : (
        <p className="py-6 text-center text-sm text-muted-foreground">
          {participants.length === 0
            ? "No participants available."
            : "No participants found."}
        </p>
      )}
    </section>
  );
}
