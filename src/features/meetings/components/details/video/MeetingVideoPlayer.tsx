import Image from "next/image";
import videoMeeting from "@/assets/images/meetingImage.png";

export default function MeetingVideoPlayer() {
  return (
    <div className="flex w-full justify-start rounded-xl border bg-muted p-2 sm:p-4">
      <div className="relative aspect-video w-full max-w-[700px] overflow-hidden rounded-lg">
        <Image
          src={videoMeeting}
          alt="Video Meeting"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 700px"
          className="object-cover"
        />
      </div>
    </div>
  );
}