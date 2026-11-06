import Image, { type StaticImageData } from "next/image";

interface TranscriptMetaProps {
  speaker: string;
  avatar: StaticImageData;
  timestamp: string;
  text: string;
}

export default function TranscriptMeta({
  speaker,
  avatar,
  timestamp,
  text,
}: TranscriptMetaProps) {
  return (
    <article className="flex gap-3 border-b border-border pb-5 last:border-0">
      {/* Avatar */}
      <Image
        src={avatar}
        alt={speaker}
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-2">
        {/* Speaker Info */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            {speaker}
          </h3>

          <span className="text-xs text-muted-foreground">
            {timestamp}
          </span>
        </div>

        {/* Transcript Text */}
        <p className="text-sm leading-6 text-muted-foreground">
          {text}
        </p>
      </div>
    </article>
  );
}