import { TaskPriority } from "../../../types/tasks.types"


interface TaskPriorityProps {
  priority: TaskPriority
}

const priorityStyles = {
  high: "bg-red-50 text-red-500",
  medium: "bg-yellow-50 text-yellow-600",
  low: "bg-[#EAF6EA] text-green-600",
}

export const TaskPriorityBadge = ({
  priority,
}: TaskPriorityProps) => {
  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] ${priorityStyles[priority]}`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  )
}