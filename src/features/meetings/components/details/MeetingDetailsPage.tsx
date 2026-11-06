
import MeetingHeader from "@/features/meetings/components/details/header/MeetingHeader";
import ProjectBadge from "@/features/meetings/components/details/header/ProjectBadge";
import MeetingVideoPlayer from "@/features/meetings/components/details/video/MeetingVideoPlayer";
import MeetingTabs from "@/features/meetings/components/details/MeetingTabs";
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
        <p className="text-muted-foreground">Meeting not found</p>
      </div>
    );
  }

  return (
    <main className="space-y-6">
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

      {/* Meeting Video */}
      <MeetingVideoPlayer />

      {/* AI Summary */}
      <MeetingTabs keyPoints={meeting.keyPoints ?? []} notes={[]} comments={[]} />
    </main>
  );
}
