'use client'
import { TaskBoard } from "@/components/common/tasks/task-board"
import type { Task } from "@/types/tasks.types"
import { taskColumns } from "../../projects/[slug]/_components/tasks.data"


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
