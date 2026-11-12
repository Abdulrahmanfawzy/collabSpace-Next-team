
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import TasksTabSkeleton from "@/components/skeletons/tasks-tab-skeleton";
import type {
  ProjectKanban,
  Task,
  TaskAssigneeOption,
  TaskStatus,
} from "@/types/tasks.types";
import { TaskBoard } from "@/components/common/tasks/task-board";
import { CreateTaskDialog } from "@/components/common/tasks/create-task-dialog";
import { UpdateTaskDialog } from "@/components/common/tasks/update-task-dialog";
import { useGetProjectKanban } from "@/hooks/tasks/use-get-project-kanban";
import { useUpdateTaskStatus } from "@/hooks/tasks/use-update-task-status";
import { moveTaskInColumns } from "@/lib/task-board";
import { useProjectPermissions } from "../../../_components/use-project-permissions";

interface TasksTabProps {
  projectId: number;
  assignees: TaskAssigneeOption[];
  isLoading?: boolean;
}

const TasksTab = ({
  projectId,
  assignees,
  isLoading: isExternallyLoading = false,
}: TasksTabProps) => {
  const [createTaskStatus, setCreateTaskStatus] = useState<TaskStatus>("todo");
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);
  const queryClient = useQueryClient();
  const {
    canCreateTask,
    canEditTask,
    canDeleteTask,
    canUpdateTaskStatus,
  } = useProjectPermissions();
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
    if (!canCreateTask) return;
    setCreateTaskStatus(status);
    setCreateTaskOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    if (!canEditTask) return;
    setTaskToUpdate(task);
  };

  const handleTaskMove = (
    taskId: string,
    status: TaskStatus,
    targetIndex: number
  ) => {
    if (!canUpdateTaskStatus) return;
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
        onAddTask={canCreateTask ? handleAddTask : undefined}
        onTaskClick={canEditTask ? handleTaskClick : undefined}
        canEditTask={canEditTask}
        canDeleteTask={canDeleteTask}
        onTaskMove={canUpdateTaskStatus ? handleTaskMove : undefined}
      />
      {canCreateTask && (
        <CreateTaskDialog
          open={createTaskOpen}
          onOpenChange={setCreateTaskOpen}
          projectId={projectId}
          defaultStatus={createTaskStatus}
          assignees={assignees}
        />
      )}
      {canEditTask && taskToUpdate && (
        <UpdateTaskDialog
          key={taskToUpdate.id}
          task={taskToUpdate}
          projectId={projectId}
          assignees={assignees}
          onOpenChange={(open) => {
            if (!open) setTaskToUpdate(null);
          }}
        />
      )}
    </section>
  );
};

export default TasksTab;