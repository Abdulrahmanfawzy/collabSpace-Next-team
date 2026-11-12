
"use client";

import { useState } from "react";
import type { TaskFilters } from "@/types/tasks.types";
import { hasPermission } from "@/features/permissions/hasPermission";
import type { UserRole } from "@/features/auth/types/auth.types";
import TasksHeader, { TaskFilterValues } from "./tasks-header";
import TasksContent from "./tasks-content";

interface TasksPageContentProps {
  roles: UserRole[];
}
const emptyFilters: TaskFilterValues = {
  projectId: "",
  status: "all",
  priority: "all",
  assignedTo: "",
  dueDate: "",
  overdue: "all",
};

function parseId(value: string): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : Number.NaN;
}

const TasksPageContent = ({ roles }: TasksPageContentProps) => {
  const [values, setValues] = useState(emptyFilters);
  const [filters, setFilters] = useState<TaskFilters>({
    page: 1,
    per_page: 15,
  });
  const [filterError, setFilterError] = useState("");
  const [search, setSearch] = useState("");
  const canCreateTask = hasPermission(roles, "create_task");
  const canEditTask = hasPermission(roles, "edit_task");
  const canDeleteTask = hasPermission(roles, "delete_task");
  const canUpdateTaskStatus = hasPermission(roles, "update_task_status");

  const handleFilterChange = (key: keyof TaskFilterValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setFilterError("");
  };

  const handleApply = () => {
    const projectId = parseId(values.projectId);
    const assignedTo = parseId(values.assignedTo);
    if (Number.isNaN(projectId) || Number.isNaN(assignedTo)) {
      setFilterError(
        "Project ID and Assignee ID must be positive whole numbers."
      );
      return false;
    }

    setFilterError("");
    setFilters({
      page: 1,
      per_page: 15,
      project_id: projectId,
      assigned_to: assignedTo,
      status:
        values.status === "all"
          ? undefined
          : (values.status as TaskFilters["status"]),
      priority:
        values.priority === "all"
          ? undefined
          : (values.priority as TaskFilters["priority"]),
      due_date: values.dueDate || undefined,
      overdue:
        values.overdue === "all"
          ? undefined
          : (Number(values.overdue) as 0 | 1),
    });
    return true;
  };

  const handleReset = () => {
    setValues(emptyFilters);
    setFilters({ page: 1, per_page: 15 });
    setFilterError("");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-bg-light py-10">
      <TasksHeader
        values={values}
        search={search}
        onChange={handleFilterChange}
        onSearchChange={setSearch}
        onApply={handleApply}
        onReset={handleReset}
        canCreateTask={canCreateTask}
      />
      {filterError && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {filterError}
        </p>
      )}
      <TasksContent
        filters={filters}
        search={search}
        canEditTask={canEditTask}
        canDeleteTask={canDeleteTask}
        canUpdateTaskStatus={canUpdateTaskStatus}
        onPageChange={(page) =>
          setFilters((current) => ({ ...current, page }))
        }
      />
    </div>
  );
};

export default TasksPageContent
