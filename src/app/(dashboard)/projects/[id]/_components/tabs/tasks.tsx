
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import TasksTabSkeleton from "@/components/skeletons/tasks-tab-skeleton";
import type { ProjectKanban, Task, TaskStatus } from "@/types/tasks.types";
import { TaskBoard } from "@/components/common/tasks/task-board";
import { CreateTaskDialog } from "@/components/common/tasks/create-task-dialog";
import { useGetProjectKanban } from "@/hooks/tasks/use-get-project-kanban";
import { useUpdateTaskStatus } from "@/hooks/tasks/use-update-task-status";
import { moveTaskInColumns } from "@/lib/task-board";

interface TasksTabProps {
  projectId: number;
  isLoading?: boolean;
}

const TasksTab = ({ projectId, isLoading: isExternallyLoading = false }: TasksTabProps) => {
  const [createTaskStatus, setCreateTaskStatus] = useState<TaskStatus>("todo");
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const queryClient = useQueryClient();
  const queryKey = ["project-kanban", projectId];
  const { data, isPending, error } = useGetProjectKanban(projectId);
  const updateTaskStatus = useUpdateTaskStatus();

  if (isExternallyLoading || isPending) {
    return <TasksTabSkeleton />;
  }

  if (error) {
    return (
      <p role="alert" className="mt-6 text-sm text-destructive">
        {error.message}
      </p>
    );
  }

  const handleAddTask = (status: TaskStatus) => {
    setCreateTaskStatus(status);
    setCreateTaskOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    console.log("Selected task:", task);
  };

  const handleTaskMove = (
    taskId: string,
    status: TaskStatus,
    targetIndex: number
  ) => {
    const currentKanban =
      queryClient.getQueryData<ProjectKanban>(queryKey);
    const sourceColumn = currentKanban?.columns.find((column) =>
      column.tasks.some((task) => task.id === taskId)
    );
    if (!currentKanban || !sourceColumn) return;

    if (sourceColumn.id === status) {
      queryClient.setQueryData<ProjectKanban>(queryKey, {
        ...currentKanban,
        columns: moveTaskInColumns(
          currentKanban.columns,
          taskId,
          status,
          targetIndex
        ),
      });
      return;
    }

    updateTaskStatus.mutate({
      projectId,
      taskId,
      status,
      targetIndex,
    });
  };

  return (
    <section className="mt-6 overflow-x-auto">
      <TaskBoard
        columns={data?.columns ?? []}
        onAddTask={handleAddTask}
        onTaskClick={handleTaskClick}
        onTaskMove={handleTaskMove}
      />
      <CreateTaskDialog
        open={createTaskOpen}
        onOpenChange={setCreateTaskOpen}
        projectId={projectId}
        defaultStatus={createTaskStatus}
      />
    </section>
  );
};

export default TasksTab;