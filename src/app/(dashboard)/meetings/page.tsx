
"use client";

import MeetingsHeader from "@/features/meetings/components/calendar/MeetingsHeader";
import MeetingsCalendar from "@/features/meetings/components/calendar/meetings-calendar";
import { useCreateMeeting } from "@/features/meetings/hooks/useMeetings";
import type { CreateMeetingValues } from "@/features/meetings/types/meeting.types";

export default function MeetingsPage() {
  const createMeetingMutation = useCreateMeeting();

  const handleCreateMeeting = async (
    values: CreateMeetingValues,
  ) => {
    await createMeetingMutation.mutateAsync(values);
  };

  return (
    <div>
      <MeetingsHeader
        onCreateMeeting={handleCreateMeeting}
        isSubmitting={createMeetingMutation.isPending}
      />

      <div className="container mx-auto my-3 overflow-hidden rounded-lg border border-border bg-background">
        <MeetingsCalendar />
      </div>
    </div>
  );
}
