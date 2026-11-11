import { Team } from "@/types/teams.types";
import type { ProjectAssignedTeam } from "@/types/project";
import { TeamBoard } from "../team-board"
import TeamsTabSkeleton from "@/components/skeletons/teams-tab-skeleton"

interface TeamsTabProps {
  teams: ProjectAssignedTeam[];
  isLoading?: boolean;
  error?: Error | null;
}

const TeamsTab = ({ teams, isLoading = false, error }: TeamsTabProps) => {
  if (isLoading) {
    return <TeamsTabSkeleton />
  }

  if (error) {
    return (
      <p role="alert" className="mt-6 text-sm text-destructive">
        {error.message}
      </p>
    );
  }

  const boardTeams: Team[] = teams.map((team) => ({
    id: String(team.id),
    name: team.name,
    members: team.members.map((member) => ({
      id: String(member.id),
      name: member.name,
      role: member.role_in_team,
      avatar: member.avatar_url,
      completedTasks: member.tasks_completed,
      totalTasks: member.tasks_total,
    })),
  }));

  return (
    <section className="mt-6 overflow-x-auto">
      {boardTeams.length > 0 ? (
        <TeamBoard teams={boardTeams} />
      ) : (
        <p className="py-8 text-center text-sm text-gray-500">
          No teams assigned to this project.
        </p>
      )}
    </section>
  )
}

export default TeamsTab