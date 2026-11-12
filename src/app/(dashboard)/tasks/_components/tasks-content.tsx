"use client";

import { useState } from "react";
import { TaskBoard } from "@/components/common/tasks/task-board";
import { UpdateTaskDialog } from "@/components/common/tasks/update-task-dialog";
import TasksTabSkeleton from "@/components/skeletons/tasks-tab-skeleton";
import { CommonPagination } from "@/components/common/common-pagination";
import { useGetTasks } from "@/hooks/tasks/use-get-tasks";
import { useUpdateTaskStatus } from "@/hooks/tasks/use-update-task-status";
import { createTaskColumns } from "@/lib/task-board";
import type { Task, TaskFilters } from "@/types/tasks.types";

interface TasksContentProps {
  filters: TaskFilters;
  search: string;
  canEditTask: boolean;
  canDeleteTask: boolean;
  canUpdateTaskStatus: boolean;
  onPageChange: (page: number) => void;
}

const TasksContent = ({
  filters,
  search,
  canEditTask,
  canDeleteTask,
  canUpdateTaskStatus,
  onPageChange,
}: TasksContentProps) => {
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);
  const { data, isPending, error } = useGetTasks(filters);
  const updateTaskStatus = useUpdateTaskStatus();
  const tasks = data?.tasks ?? [];

  const handleTaskClick = (task: Task) => {
    if (!canEditTask) return;
    setTaskToUpdate(task);
  };

  const handleTaskMove = (
    taskId: string,
    status: Task["status"],
    targetIndex: number
  ) => {
    if (!canUpdateTaskStatus) return;
    const task = tasks.find((item) => item.id === taskId);
    if (!task || task.status === status) return;

    updateTaskStatus.mutate({
      projectId: task.projectId ?? filters.project_id,
      taskId,
      status,
      targetIndex,
    });
  };

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const visibleTasks = tasks.filter((task) => {
    if (!normalizedSearch) return true;

    return [
      task.name,
      task.description,
      task.status,
      task.priority,
      ...task.assignees.map((assignee) => assignee.name),
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalizedSearch);
  });

  return (
    <div className="mt-6">
      {canEditTask && taskToUpdate && (
        <UpdateTaskDialog
          key={taskToUpdate.id}
          task={taskToUpdate}
          onOpenChange={(open) => {
            if (!open) setTaskToUpdate(null);
          }}
        />
      )}
      {isPending ? (
        <TasksTabSkeleton />
      ) : error ? (
        <p role="alert" className="text-sm text-destructive">
          {error.message}
        </p>
      ) : visibleTasks.length > 0 ? (
        <TaskBoard
          columns={createTaskColumns(visibleTasks)}
          onTaskClick={canEditTask ? handleTaskClick : undefined}
          canEditTask={canEditTask}
          canDeleteTask={canDeleteTask}
          onTaskMove={
            canUpdateTaskStatus && !updateTaskStatus.isPending
              ? handleTaskMove
              : undefined
          }
        />
      ) : (
        <p className="py-12 text-center text-sm text-gray-500">
          No tasks match the selected filters.
        </p>
      )}
      {!isPending && !error && data && (
        <CommonPagination
          currentPage={data.pagination.current_page}
          lastPage={data.pagination.last_page}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default TasksContent;
