

import TasksTabSkeleton from "@/components/skeletons/tasks-tab-skeleton"
import { Task } from "@/types/tasks.types"
import { taskColumns } from "../tasks.data"
import {TaskBoard} from "@/components/common/tasks/task-board"

interface TasksTabProps {
  isLoading?: boolean
}

const TasksTab = ({ isLoading = false }: TasksTabProps) => {
  if (isLoading) {
    return <TasksTabSkeleton />
  }

  const handleAddTask = (status: string) => {
    console.log("Add task to:", status)
  }

  const handleTaskClick = (task: Task) => {
    console.log("Selected task:", task)
  }
  return (
    <section className="mt-6 overflow-x-auto">
      <TaskBoard
        columns={taskColumns}
        onAddTask={handleAddTask}
        onTaskClick={handleTaskClick}
      />
    </section>
  )
}

export default TasksTab