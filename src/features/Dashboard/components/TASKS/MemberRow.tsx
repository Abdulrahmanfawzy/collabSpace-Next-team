import { TeamMember } from "../../types/typesDashboard"
import { Progress } from "../../../../components/ui/progress"
import { cn } from "../../../../utils/cn"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"

export default function MemberRow({ member }: { member: TeamMember }) {
    const percent = member.total > 0 ? (member.done / member.total) * 100 : 0
    function initials(name: string) {
        return name
          .split(" ")
          .slice(0, 2)
          .map((p) => p[0])
          .join("")
          .toUpperCase()
      }
      const BAR = "h-1.5 bg-blue-100 [&>div]:bg-blue-600"

    return (
      <li className="flex items-center gap-3">
        <div className="relative shrink-0">
          <Avatar className="size-8">
            <AvatarImage src={member.avatarUrl} alt="" />
            <AvatarFallback className="text-xs">{initials(member.name)}</AvatarFallback>
          </Avatar>
          {member.isLeader && (
            <span
              className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-card bg-blue-600"
              aria-hidden
            />
          )}
        </div>
  
        <div className="min-w-0 flex-1">
          <p className="flex items-baseline gap-2 truncate text-sm font-medium">
            {member.name}
            {member.isLeader && (
              <span className="text-[11px] font-normal text-muted-foreground">Leader</span>
            )}
          </p>
          <Progress
            value={percent}
            aria-label={`${member.name}: ${member.done} of ${member.total} tasks`}
            className={cn("mt-1.5", BAR)}
          />
        </div>
  
        <span className="w-12 text-right text-sm tabular-nums text-muted-foreground">
          {member.done}/{member.total}
        </span>
      </li>
    )
  }
  
