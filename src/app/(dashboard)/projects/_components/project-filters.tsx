import { Input } from "@/components/ui/input"
import { CommonSelect } from "@/components/common/common-select"

const projectOptions = [
  { label: "All Projects", value: "All Projects" },
  { label: "Project one", value: "Project one" },
  { label: "Project Two", value: "Project Two" },
]

const themeOptions = [
  { label: "Newest", value: "Newest" },
  { label: "Latest", value: "Latest" },
  
]

export function ProjectFilters() {
  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:gap-2 sm:flex-row  ">
      <Input
        className="w-full sm:w-75 h-10! rounded-[100px] bg-white border border-bg-label "
        placeholder="Search ..."
      />
      <div className="flex items-center justify-between gap-4">
        <CommonSelect options={projectOptions} placeholder="All projects" />
        <CommonSelect options={themeOptions} placeholder="Newest" />
      </div>
    </div>
  )
}
