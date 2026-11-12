import { Dot } from "lucide-react"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

import { AddTaskButton } from "./add-task-button"
import { TaskCard } from "./task-card"
import type { TaskColumn as TaskColumnType, Task } from "../../../types/tasks.types"

interface TaskColumnProps {
  column: TaskColumnType
  onAddTask?: (status: TaskColumnType["id"]) => void
  onTaskClick?: (task: Task) => void
  canEditTask: boolean
  canDeleteTask: boolean
  enableDragAndDrop: boolean
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
  canEditTask,
  canDeleteTask,
  enableDragAndDrop,
}: TaskColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: `column:${column.id}`,
    data: { type: "column", status: column.id },
    disabled: !enableDragAndDrop,
  })

  return (
    <div
      ref={setNodeRef}
      className="min-w-0 self-start overflow-hidden rounded-xl border border-gray-100 bg-white"
    >

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

      </div>

      {/*---------------- Column Content-------------------- */}
      <div className="flex flex-col gap-3 p-3">

        {onAddTask && (
          <AddTaskButton onClick={() => onAddTask(column.id)} />
        )}

        <SortableContext
          items={column.tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={onTaskClick}
              canEditTask={canEditTask}
              canDeleteTask={canDeleteTask}
              draggable={enableDragAndDrop}
              index={index}
            />
          ))}
        </SortableContext>

      </div>
    </div>
  )
}