
"use client";

interface MeetingVideoPlayerProps {
  roomName: string;
  displayName?: string;
}

export default function MeetingVideoPlayer({
  roomName,
  displayName = "CollabSpace User",
}: MeetingVideoPlayerProps) {
  const meetingUrl = `https://meet.jit.si/${encodeURIComponent(roomName)}#userInfo.displayName="${encodeURIComponent(displayName)}"`;

  return (
    <div className="w-full rounded-xl border bg-muted p-2 sm:p-4">
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          src={meetingUrl}
          title="Jitsi Meeting"
          allow="camera; microphone; display-capture; fullscreen; autoplay; clipboard-write"
          referrerPolicy="no-referrer"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
