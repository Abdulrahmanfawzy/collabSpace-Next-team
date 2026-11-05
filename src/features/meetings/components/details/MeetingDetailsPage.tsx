import MeetingHeader from "@/features/meetings/components/details/header/MeetingHeader";
import ProjectBadge from "@/features/meetings/components/details/header/ProjectBadge";
import { meetings } from "@/features/meetings/data/data";

type Props = {
  meetingId: string;
};

export default function MeetingDetailsPage({ meetingId }: Props) {
  const meeting = meetings.find(
    (meeting) => String(meeting.id) === meetingId
  );

  if (!meeting) {
    return <div>Meeting not found</div>;
  }

  return (
    <div className="space-y-4">
      <MeetingHeader
        data={{ ...meeting, name: meeting.title }}
      />

      <div className="p-4">
        <ProjectBadge
          name={meeting.project.name}
          startTime={meeting.startTime}
          endTime={meeting.endTime}
          year={meeting.year}
        />
      </div>
    </div>
  );
}
