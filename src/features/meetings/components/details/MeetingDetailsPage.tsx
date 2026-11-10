
"use client";

import MeetingHeader from "@/features/meetings/components/details/header/MeetingHeader";
import ProjectBadge from "@/features/meetings/components/details/header/ProjectBadge";
import MeetingVideoPlayer from "@/features/meetings/components/details/video/MeetingVideoPlayer";
import MeetingTabs from "@/features/meetings/components/details/MeetingTabs";
import MeetingTranscripts from "@/features/meetings/components/details/transcripts/MeetingTranscripts";
import { useMeetingDetails } from "@/features/meetings/hooks/useMeetingDetails";

type Props = {
  meetingId: string;
};

export default function MeetingDetailsPage({ meetingId }: Props) {
  const id = Number(meetingId);

  const isValidId = Number.isInteger(id) && id > 0;

  const {
    data: meeting,
    isLoading,
    isError,
    error,
  } = useMeetingDetails(id);

  if (!isValidId) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-muted-foreground">
          Invalid meeting ID.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-muted-foreground">
          Loading meeting...
        </p>
      </div>
    );
  }

  if (isError || !meeting) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "Meeting not found"}
        </p>
      </div>
    );
  }

  const year = new Date(meeting.meeting_date).getFullYear();

  return (
    <div className="space-y-6">
      {/* Meeting Header */}
      <MeetingHeader
        data={{
          ...meeting,
          name: meeting.title,
        }}
      />

      {/* Project Information */}
      <div className="px-4">
        <ProjectBadge
  name={meeting.project.name}
  startTime={meeting.start_time}
  endTime={meeting.end_time}
  year={year}
  participants={meeting.participants ?? []}
/>
      </div>

      <div className="border-t" />

      {/* Meeting Content */}
      <div className="grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)] lg:px-8">

        {/* Left Section */}
        <section className="min-w-0 space-y-6">
          <MeetingVideoPlayer />

          <MeetingTabs
            keyPoints={meeting.summary?.decisions_made ?? []}
          />
        </section>

        {/* Right Section */}
        <aside className="min-w-0">
          <MeetingTranscripts
            participants={meeting.participants ?? []}
          />
        </aside>

      </div>
    </div>
  );
}
