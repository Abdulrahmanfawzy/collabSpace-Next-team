import Image from "next/image";
import { TeamMember } from "../../../../../types/teams.types";
import { BadgeCheck } from "lucide-react";


interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard = ({
  member,
}: TeamMemberCardProps) => {
  const percentage =
    member.totalTasks > 0
      ? (member.completedTasks / member.totalTasks) * 100
      : 0;
  const isLeader = member.role.toLowerCase().includes("leader");
  return (
    <div className="flex items-center gap-2 border-b border-bg-label pb-4 mt-3 last:border-b-0">
      {/* Avatar */}
      <div className="relative h-10 w-10 shrink-0">
        <Image
          src={member.avatar}
          alt={member.name}
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        {/*------------------------------ Leader Badge------------------------------------ */}
        {isLeader && (
          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-white">
            <BadgeCheck size={19} />
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        {/* Name & Role */}
        <div className="flex min-w-0 items-center gap-1">
          <span className="truncate text-sm font-medium text-text-primary">
            {member.name}
          </span>
          <span className="truncate text-xs text-overlay-dark">
            {member.role}
          </span>
        </div>

        {/*------------------------------ Progress & Tasks Count------------------------------------ */}
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="shrink-0 text-[9px] text-text-dark">
            {String(member.completedTasks).padStart(2, "0")}/
            {String(member.totalTasks).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};