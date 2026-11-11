"use client";

import { TaskBoard } from "@/components/common/tasks/task-board";
import TasksTabSkeleton from "@/components/skeletons/tasks-tab-skeleton";
import { CommonPagination } from "@/components/common/common-pagination";
import { useGetTasks } from "@/hooks/tasks/use-get-tasks";
import { createTaskColumns } from "@/lib/task-board";
import type { Task, TaskFilters } from "@/types/tasks.types";

interface TasksContentProps {
  filters: TaskFilters;
  search: string;
  onPageChange: (page: number) => void;
}

const TasksContent = ({ filters, search, onPageChange }: TasksContentProps) => {
  const { data, isPending, error } = useGetTasks(filters);
  const tasks = data?.tasks ?? [];

  const handleAddTask = (status: string) => {
    console.log("Add task to:", status);
  };

  const handleTaskClick = (task: Task) => {
    console.log("Selected task:", task);
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
      {isPending ? (
        <TasksTabSkeleton />
      ) : error ? (
        <p role="alert" className="text-sm text-destructive">
          {error.message}
        </p>
      ) : visibleTasks.length > 0 ? (
        <TaskBoard
          columns={createTaskColumns(visibleTasks)}
          onAddTask={handleAddTask}
          onTaskClick={handleTaskClick}
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
