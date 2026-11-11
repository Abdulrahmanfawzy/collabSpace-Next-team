import { CalendarDays, MessageSquare, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"

import { TaskPriorityBadge } from "./task-priority"
import { Task } from "../../../types/tasks.types"

interface TaskCardProps {
    task: Task
    onClick?: (task: Task) => void
}

export const TaskCard = ({
    task,
    onClick,
}: TaskCardProps) => {
    return (
        <article
            onClick={() => onClick?.(task)}
            className="cursor-pointer rounded-xl bg-bg-light p-4 flex flex-col
        transition hover:bg-gray-100  border border-bg-label"
        >
            <div className="flex flex-col gap-2">
                {/*----------------------Title and Priority----------------- */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-text-dark">
                        {task.name}
                    </h3>

                    <TaskPriorityBadge priority={task.priority} />
                </div>

                {/*---------------------- Description---------------------- */}
                <p className="mt-2 text-[11px] text-gray-500">
                    {task.description}
                </p>
            </div>
            {/*---------------------- Progress---------------------- */}

            <div className={`mt-3 ${task.progress === undefined ? "invisible" : ""
                }`}>
                <div className="mb-1 flex justify-between text-[10px]">
                    <span className="text-gray-500">Progress</span>
                    <span>{task.progress}%</span>
                </div>

                <Progress
                    value={task.progress}
                    className="h-1 bg-gray-200"
                />
            </div>


            {/*---------------------- Reviewer---------------------- */}

            {/* Reviewer */}
            <div
                className={`flex h-8 items-center justify-between mb-3 ${task.reviewer ? "" : "invisible"
                    }`}
            >
                <div className="flex items-center gap-2">
                    {task.reviewer && (
                        <>
                            {task.reviewer.avatar ? (
                                <img
                                    src={typeof task.reviewer.avatar === "string" ? task.reviewer.avatar : task.reviewer.avatar.src}
                                    alt={task.reviewer.name}
                                    className="size-6 rounded-full object-cover"
                                />
                            ) : (
                                <span className="flex size-6 items-center justify-center rounded-full bg-gray-200 text-[9px] font-medium text-gray-600">
                                    {task.reviewer.name.charAt(0).toUpperCase()}
                                </span>
                            )}

                            <span className="text-[10px] text-text-dark">
                                {task.reviewer.name}
                            </span>
                        </>
                    )}
                </div>

                <span className="text-[10px] text-gray-500">
                    Reviewer
                </span>
            </div>


            {/*---------------------- Footer---------------------- */}
            <div className="flex items-center justify-between">
                {/* --------------------Assignees-------------------- */}
                <div className="flex -space-x-2">
                    {task.assignees.map((user) =>
                        user.avatar ? (
                            <img
                                key={user.id}
                                src={typeof user.avatar === "string" ? user.avatar : user.avatar.src}
                                alt={user.name}
                                className="size-6 rounded-full border-2 border-white object-cover"
                            />
                        ) : (
                            <span
                                key={user.id}
                                title={user.name}
                                className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-[9px] font-medium text-gray-600"
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        )
                    )}
                </div>

                {/*---------------------- Task Metadata---------------------- */}
                <div className="flex items-center gap-2 text-[10px] text-secondary-500">
                    

                    <span className="flex items-center gap-1">
                        {task.commentsCount}
                        <MessageSquare size={12} />
                        
                    </span>

                    <span className="flex items-center gap-1">
                        {task.dueDate}
                        <CalendarDays size={12} />
                    </span>
                </div>
            </div>
        </article>
    )
}