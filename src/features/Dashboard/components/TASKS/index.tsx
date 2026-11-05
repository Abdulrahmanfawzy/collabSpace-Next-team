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
      <div className="contents h-20">
        <Tasks tasks={tasks} viewAllHref={tasksHref} />
        <Teams members={members} teams={teams} />
      </div>
    )
  }
  
