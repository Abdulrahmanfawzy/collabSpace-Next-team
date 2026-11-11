'use client'
import { TaskBoard } from "@/components/common/tasks/task-board"
import type { Task } from "@/types/tasks.types"
<<<<<<< HEAD
import { taskColumns } from "../../projects/[id]/_components/tasks.data"
=======
import { taskColumns } from "../../projects/[slug]/_components/tasks.data"
>>>>>>> 937fba3d463ee8ae0cb6c82d7a4115c617a78faa


interface IProps {



}

const TasksContent = ({ }: IProps) => {
    const handleAddTask = (status: string) => {
        console.log("Add task to:", status)
    }

    const handleTaskClick = (task: Task) => {
        console.log("Selected task:", task)
    }
    return (
        <div className="mt-6">
            <TaskBoard
                columns={taskColumns}
                onAddTask={handleAddTask}
                onTaskClick={handleTaskClick}
            />

        </div>
    )
}

export default TasksContent
