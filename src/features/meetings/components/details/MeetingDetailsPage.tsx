import MeetingHeader from "@/features/meetings/components/details/header/MeetingHeader";
import ProjectBadge from "@/features/meetings/components/details/header/ProjectBadge";
import MeetingVideoPlayer from "@/features/meetings/components/details/video/MeetingVideoPlayer";
import MeetingTabs from "@/features/meetings/components/details/MeetingTabs";
import MeetingTranscripts from "@/features/meetings/components/details/transcripts/MeetingTranscripts";
import { meetings } from "@/features/meetings/data/data";

type Props = {
  meetingId: string;
};

export default function MeetingDetailsPage({ meetingId }: Props) {
  const meeting = meetings.find(
    (item) => String(item.id) === meetingId
  );

  if (!meeting) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-muted-foreground">
          Meeting not found
        </p>
      </div>
    );
  }

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
          startTime={meeting.startTime}
          endTime={meeting.endTime}
          year={meeting.year}
        />
      </div>

      <div className="border-t" />

      {/* Meeting Content */}
      <div className="grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)] lg:px-8">

        {/* Left Section */}
        <section className="min-w-0 space-y-6">
          <MeetingVideoPlayer />

          <MeetingTabs
            keyPoints={meeting.keyPoints ?? []}
          />
        </section>

        {/* Right Section */}
        <aside className="min-w-0">
          <MeetingTranscripts />
        </aside>

      </div>
    </div>
  );
}
