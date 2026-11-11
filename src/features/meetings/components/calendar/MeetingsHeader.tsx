
import AddMeetingDialog from "@/features/meetings/components/calendar/AddMeetingDialog";

import type { CreateMeetingValues } from "@/features/meetings/types/meeting.types";

type MeetingsHeaderProps = {
  onCreateMeeting: (values: CreateMeetingValues) => Promise<void>;
  isSubmitting?: boolean;
};

export default function MeetingsHeader({
  onCreateMeeting,
  isSubmitting = false,
}: MeetingsHeaderProps) {
  return (
    <div className="container mx-auto my-3 flex items-center justify-between rounded-lg bg-app-neutral-light px-6 py-4">
      <h1 className="text-2xl font-bold text-text-primary">
        Meetings
      </h1>

      <AddMeetingDialog
        onSubmit={onCreateMeeting}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
