"use client";

import { useMeetings } from "@/features/meetings/hooks/useMeetings";

export default function MeetingsTest() {
  const { data, isLoading, isError, error } = useMeetings();

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h2>Meetings: {data?.length}</h2>

      {data?.map((meeting) => (
        <div key={meeting.id}>
          <h3>{meeting.title}</h3>
          <p>{meeting.meeting_date}</p>
          <p>{meeting.start_time} - {meeting.end_time}</p>
          <p>{meeting.project.name}</p>
          <p>Participants: {meeting.participants_count}</p>
        </div>
      ))}
    </div>
  );
}