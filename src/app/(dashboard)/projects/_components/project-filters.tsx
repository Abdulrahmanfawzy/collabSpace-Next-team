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
    <div className="mt-5 flex items-center justify-between gap-2">
      <Input
        className="w-75 rounded-[100px] bg-white"
        placeholder="Search ..."
      />
      <div className="flex items-center justify-between gap-2">
        <CommonSelect options={projectOptions} placeholder="All projects" />
        <CommonSelect options={themeOptions} placeholder="Newest" />
      </div>
    </div>
  )
}
