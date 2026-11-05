import { TasksAndTeamsProps } from "../../types/typesDashboard"
import { Tasks  } from "./Tasks"
import { Teams } from "./Teams"

export function TasksAndTeams({
    tasks,
    members,
    teams,
    tasksHref,
  }: TasksAndTeamsProps) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Tasks tasks={tasks} viewAllHref={tasksHref} />
        <Teams members={members} teams={teams} />
      </div>
    )
  }
  
