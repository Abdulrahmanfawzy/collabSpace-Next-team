
import { Team } from "../../../../../types/teams.types";
import { TeamMemberCard } from "./team-member-card";

interface TeamColumnProps {
  team: Team;
}

const columnStyles: Record<string, string[]> = {
  "UI/UX": ["bg-[#FAECF6]",'text-[#A43782]'],
  "Frontend":["bg-[#F2EAF2]",'text-[#7D2D7E]'],
  "Backend":["bg-[#E6F8F7]",'text-[#04B5AE]'],
  "Marketing":["bg-[#E9E9EA]",'text-secondary-500'],
};

export const TeamColumn = ({ team }: TeamColumnProps) => {
  const totalTasks = team.members.reduce(
    (total, member) => total + member.totalTasks,
    0
  );

  const completedTasks = team.members.reduce(
    (total, member) => total + member.completedTasks,
    0
  );

  const percentage =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  return (
    <div className="min-w-0 overflow-hidden rounded-xl bg-white shadow-sm">

      {/*---------------------------------------- Column Header--------------------------------- */}
      <div
        className={`flex items-center justify-between gap-2 p-5 ${columnStyles[team.name][0] ?? "bg-gray-100"}`}
      >
        <h2 className="text-xs font-semibold text-gray-900">
          {team.name}
        </h2>

        <span className={`whitespace-nowrap text-xs font-medium ${columnStyles[team.name][1] ?? "text-gray-500"}`}>
          {percentage}% Completed
        </span>
      </div>

      {/* ----------------------------------------Column Content-------------------------------- */}
      <div className="p-3">

        {/* --------------------------------------Table Header----------------------------------- */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-secondary">
            Name
          </span>

          <span className="text-xs font-medium text-secondary">
            Tasks
          </span>
        </div>

        {/* --------------------------------------Team Members----------------------------------- */}
        <div className="flex flex-col gap-5">
          {team.members.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
            />
          ))}
        </div>

      </div>
    </div>
  );
};