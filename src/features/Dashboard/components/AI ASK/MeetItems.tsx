import { CalendarDays } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Meeting } from "../../types/typesDashboard"
const MAX_AVATARS = 3

export default function MeetingItem({ meeting }: { meeting: Meeting }) {
    const shown = meeting.participants.slice(0, MAX_AVATARS)
    const extra = meeting.participants.length - shown.length

function initials(name: string) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase()
  }
    return (
      <li className="rounded-xl border border-border/60 p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium">{meeting.title}</h3>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {new Date(`${meeting.date}T${meeting.start_time}`).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
            <CalendarDays className="size-3.5" aria-hidden />
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div
            className="flex -space-x-2"
            role="group"
            aria-label={`${meeting.participants.length} attendees`}
          >
            {shown.map((a) => (
              <Avatar key={a.name} className="size-8 ring-2 ring-card">
                <AvatarImage src={a.avatar_url ?? undefined} alt={a.name} />
                <AvatarFallback className="text-[10px]">{initials(a.name)}</AvatarFallback>
              </Avatar>
            ))}
            {extra > 0 && (
              <span className="relative grid size-8 place-items-center rounded-full bg-muted text-xs text-muted-foreground ring-2 ring-card">
                +{extra}
              </span>
            )}
          </div>
          <span className="text-xs tabular-nums text-muted-foreground">{meeting.project.name}</span>
        </div>
      </li>
    )
  }
