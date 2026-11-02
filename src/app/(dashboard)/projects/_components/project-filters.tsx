import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const projectOptions = [
  { label: "All Projects", value: "All Projects" },
  { label: "Project one", value: "Project one" },
  { label: "Project Two", value: "Project Two" },
]

const themeOptions = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
]

function FilterSelect({ options }: { options: typeof projectOptions }) {
  return (
    <Select>
      <SelectTrigger className="w-45 rounded-[16px] border border-secondary-500 bg-transparent">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function ProjectFilters() {
  return (
    <div className="mt-5 flex items-center justify-between gap-2">
      <Input
        className="w-75 rounded-[100px] bg-white"
        placeholder="Search ..."
      />
      <div className="flex items-center justify-between gap-2">
        <FilterSelect options={projectOptions} />
        <FilterSelect options={themeOptions} />
      </div>
    </div>
  )
}
