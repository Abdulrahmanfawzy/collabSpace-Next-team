
"use client";

import { useState } from "react";
import TasksTabSkeleton from "@/components/skeletons/tasks-tab-skeleton"
import type { Task } from "@/types/tasks.types"
import { TaskBoard } from "@/components/common/tasks/task-board"
import { useGetProjectTasks } from "@/hooks/tasks/use-get-project-tasks"
import { createTaskColumns } from "@/lib/task-board"
import { CommonPagination } from "@/components/common/common-pagination"

interface TasksTabProps {
  projectId: number;
  isLoading?: boolean;
}

const TasksTab = ({ projectId, isLoading: isExternallyLoading = false }: TasksTabProps) => {
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useGetProjectTasks(projectId, page);
  const tasks = data?.tasks ?? [];

  if (isExternallyLoading || isPending) {
    return <TasksTabSkeleton />
  }

  if (error) {
    return (
      <p role="alert" className="mt-6 text-sm text-destructive">
        {error.message}
      </p>
    );
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
        columns={createTaskColumns(tasks)}
        onAddTask={handleAddTask}
        onTaskClick={handleTaskClick}
      />
      {data && (
        <CommonPagination
          currentPage={data.pagination.current_page}
          lastPage={data.pagination.last_page}
          onPageChange={setPage}
        />
      )}
    </section>
  )
}

export default TasksTab