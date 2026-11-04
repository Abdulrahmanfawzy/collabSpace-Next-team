
import { TaskBoard } from "../../../../../../components/common/tasks/task-board"
import { Task } from "../../../../../../types/tasks.types"
import { taskColumns } from "../tasks.data"

const TasksTab = () => {
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