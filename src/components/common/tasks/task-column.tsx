import { Dot, MoreVertical } from "lucide-react"

import { AddTaskButton } from "./add-task-button"
import { TaskCard } from "./task-card"
import type{TaskColumn as TaskColumnType, Task } from "../../../types/tasks.types"

interface TaskColumnProps {
  column: TaskColumnType
  onAddTask?: (status: TaskColumnType["id"]) => void
  onTaskClick?: (task: Task) => void
}

const columnStyles = {
  "todo": "bg-[#F9FAFB]",
  "in-progress": "bg-primary-50",
  "in-review": "bg-[#FAECF6]",
  "completed": "bg-[#EAF6EA]",
}

export const TaskColumn = ({
  column,
  onAddTask,
  onTaskClick,
}: TaskColumnProps) => {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white">

      {/*---------------- Column Header-------------------- */}
      <div
        className={`flex items-center justify-between p-2 ${columnStyles[column.id]}`}
      >
       <div className="flex items-center">
         <Dot className="text-[#6837A4] w-10 h-10" />
        <h2 className="text-xs font-semibold">
          {column.title}
        </h2>
       </div>

        <button type="button" aria-label="Column options">
          <MoreVertical size={16} />
        </button>
      </div>

      {/*---------------- Column Content-------------------- */}
      <div className="flex flex-col gap-3 p-3">

        <AddTaskButton
          onClick={() => onAddTask?.(column.id)}
        />

        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onTaskClick}
          />
        ))}

      </div>
    </div>
  )
}