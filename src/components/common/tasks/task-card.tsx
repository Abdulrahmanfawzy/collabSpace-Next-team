import {
    CalendarDays,
    Ellipsis,
    GripVertical,
    LoaderCircle,
    MessageSquare,
    Pencil,
    Trash2,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"

import { TaskPriorityBadge } from "./task-priority"
import type { Task } from "../../../types/tasks.types"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteTask } from "@/hooks/tasks/use-delete-task"

interface TaskCardProps {
    task: Task
    onClick?: (task: Task) => void
    canEditTask: boolean
    canDeleteTask: boolean
    draggable?: boolean
    index: number
}

export const TaskCard = ({
    task,
    onClick,
    canEditTask,
    canDeleteTask,
    draggable = false,
    index,
}: TaskCardProps) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        disabled: !draggable,
        data: { type: "task", status: task.status, index },
    })

    const handleDelete = () => {
        if (!canDeleteTask) return
        deleteTask(
            { taskId: task.id, projectId: task.projectId },
            { onSuccess: () => setDeleteDialogOpen(false) }
        )
    }

    return (
        <article
            ref={setNodeRef}
            onClick={canEditTask ? () => onClick?.(task) : undefined}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                opacity: isDragging ? 0.5 : undefined,
            }}
            className={`${canEditTask ? "cursor-pointer" : ""} rounded-xl bg-bg-light p-4 flex flex-col transition hover:bg-gray-100 border border-bg-label`}
        >
            <div className="flex flex-col gap-2">
                {/*----------------------Title and Priority----------------- */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-start gap-1">
                        {draggable && (
                            <button
                                type="button"
                                aria-label={`Drag ${task.name}`}
                                className="mt-0.5 shrink-0 cursor-grab text-gray-400 active:cursor-grabbing"
                                onClick={(event) => event.stopPropagation()}
                                {...attributes}
                                {...listeners}
                            >
                                <GripVertical size={14} />
                            </button>
                        )}
                        <h3 className="text-xs font-bold text-text-dark">
                            {task.name}
                        </h3>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                        <TaskPriorityBadge priority={task.priority} />
                        {(canEditTask || canDeleteTask) && <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    aria-label={`Task actions for ${task.name}`}
                                    className="size-7"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <Ellipsis aria-hidden="true" size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-36"
                                onClick={(event) => event.stopPropagation()}
                            >
                                {canEditTask && (
                                    <DropdownMenuItem
                                        onSelect={() => onClick?.(task)}
                                    >
                                        <Pencil aria-hidden="true" />
                                        Edit
                                    </DropdownMenuItem>
                                )}
                                {canDeleteTask && (
                                    <DropdownMenuItem
                                        variant="destructive"
                                        onSelect={() => setDeleteDialogOpen(true)}
                                    >
                                        <Trash2 aria-hidden="true" />
                                        Delete
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>}
                    </div>
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
            {canDeleteTask && <Dialog
                open={deleteDialogOpen}
                onOpenChange={(open) => {
                    if (!isDeleting) setDeleteDialogOpen(open)
                }}
            >
                <DialogContent onClick={(event) => event.stopPropagation()}>
                    <DialogHeader>
                        <DialogTitle>Delete task?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete “{task.name}”? This
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <LoaderCircle
                                        aria-hidden="true"
                                        className="animate-spin"
                                        size={16}
                                    />
                                    Deleting…
                                </>
                            ) : (
                                <>
                                    <Trash2 aria-hidden="true" size={16} />
                                    Delete task
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>}
        </article>
    )
}