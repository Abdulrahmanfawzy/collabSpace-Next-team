"use client"


import { TaskBoardProps } from "../../../types/tasks.types"
import { TaskColumn } from "./task-column"

export const TaskBoard = ({
  columns,
  onAddTask,
  onTaskClick,
}: TaskBoardProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <TaskColumn
          key={column.id}
          column={column}
          onAddTask={onAddTask}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  )
}