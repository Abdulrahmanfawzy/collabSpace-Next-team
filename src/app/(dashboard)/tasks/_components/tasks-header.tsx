"use client";

import { useState } from "react";
import { Filter, Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CommonSelect } from "@/components/common/common-select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface TaskFilterValues {
  projectId: string;
  status: string;
  priority: string;
  assignedTo: string;
  dueDate: string;
  overdue: string;
}

interface TasksHeaderProps {
  values: TaskFilterValues;
  search: string;
  onChange: (key: keyof TaskFilterValues, value: string) => void;
  onSearchChange: (value: string) => void;
  onApply: () => boolean;
  onReset: () => void;
}

const statusOptions = [
  { label: "All statuses", value: "all" },
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "In Review", value: "In Review" },
  { label: "Completed", value: "Completed" },
];

const priorityOptions = [
  { label: "All priorities", value: "all" },
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Critical", value: "Critical" },
];

const overdueOptions = [
  { label: "Any due date", value: "all" },
  { label: "Overdue", value: "1" },
  { label: "Not overdue", value: "0" },
];

const TasksHeader = ({
  values,
  search,
  onChange,
  onSearchChange,
  onApply,
  onReset,
}: TasksHeaderProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount = [
    values.projectId,
    values.status !== "all",
    values.priority !== "all",
    values.assignedTo,
    values.dueDate,
    values.overdue !== "all",
  ].filter(Boolean).length;

  const applyFilters = () => {
    if (onApply()) setFiltersOpen(false);
  };

  const resetFilters = () => {
    onReset();
    setFiltersOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative w-full max-w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-900" />
            <Input
              type="search"
              placeholder="Search"
              aria-label="Search tasks"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              className="h-10! w-full rounded-[100px] border-0 bg-secondary-50 pl-12 text-base"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="relative shrink-0 rounded-full"
            aria-label="Open task filters"
            onClick={() => setFiltersOpen(true)}
          >
            <Filter aria-hidden="true" />
            {activeFilterCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        <Button variant="default" size="default" className="shrink-0 rounded-3xl">
          Create Task
          <Plus />
        </Button>
      </header>

      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent
          showCloseButton={false}
          className="fixed inset-y-0 right-0 left-auto top-0 h-dvh w-full max-w-md translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-none p-0 sm:max-w-md data-open:animate-in data-open:slide-in-from-right data-closed:animate-out data-closed:slide-out-to-right"
        >
          <DialogHeader className="border-b border-gray-100 px-6 py-5 text-left">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Filter tasks
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                  Narrow your list using one or more criteria.
                </DialogDescription>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
              >
                <X aria-hidden="true" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex flex-1 flex-col gap-5 px-6 py-6">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Project ID
              <Input
                type="number"
                min={1}
                value={values.projectId}
                onChange={(event) => onChange("projectId", event.target.value)}
                placeholder="Enter project ID"
                className="h-10 rounded-lg"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Status
              <CommonSelect
                options={statusOptions}
                placeholder="All statuses"
                value={values.status}
                onValueChange={(value) => onChange("status", value)}
                triggerClassName="w-full rounded-lg"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Priority
              <CommonSelect
                options={priorityOptions}
                placeholder="All priorities"
                value={values.priority}
                onValueChange={(value) => onChange("priority", value)}
                triggerClassName="w-full rounded-lg"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Assignee ID
              <Input
                type="number"
                min={1}
                value={values.assignedTo}
                onChange={(event) => onChange("assignedTo", event.target.value)}
                placeholder="Enter assignee ID"
                className="h-10 rounded-lg"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Due date
              <Input
                type="date"
                value={values.dueDate}
                onChange={(event) => onChange("dueDate", event.target.value)}
                className="h-10 rounded-lg"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
              Overdue
              <CommonSelect
                options={overdueOptions}
                placeholder="Any due date"
                value={values.overdue}
                onValueChange={(value) => onChange("overdue", value)}
                triggerClassName="w-full rounded-lg"
              />
            </label>
          </div>

          <div className="flex gap-3 border-t border-gray-100 p-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-lg"
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button
              type="button"
              className="flex-1 rounded-lg"
              onClick={applyFilters}
            >
              Apply filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TasksHeader;
