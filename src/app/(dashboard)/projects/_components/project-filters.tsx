import { Input } from "@/components/ui/input"
import { CommonSelect } from "@/components/common/common-select"
import { Search } from "lucide-react"

const statusOptions = [
  { label: "All Statuses", value: "all" },
  { label: "Planning", value: "Planning" },
  { label: "In Progress", value: "In Progress" },
  { label: "On Hold", value: "On Hold" },
  { label: "Completed", value: "Completed" },
];

const priorityOptions = [
  { label: "All Priorities", value: "all" },
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Critical", value: "Critical" },
];
interface ProjectFiltersProps {
  search: string;
  status: string;
  priority: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

export function ProjectFilters({search, status, priority, onSearchChange, onStatusChange, onPriorityChange}: ProjectFiltersProps) {
  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:gap-2 sm:flex-row  ">
      <div className="relative w-full max-w-80">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-900" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-75 h-10! rounded-[100px] pl-12 bg-white border border-bg-label placeholder:text-neutral-900 "
          placeholder="Search"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <CommonSelect
          options={statusOptions}
          placeholder="All statuses"
          value={status}
          onValueChange={onStatusChange}
        />
        <CommonSelect
          options={priorityOptions}
          placeholder="All priorities"
          value={priority}
          onValueChange={onPriorityChange}
        />
      </div>
    </div>
  )
}
