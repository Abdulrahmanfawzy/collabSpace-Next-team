import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProjectsHeader() {
  return (
    <header className="flex items-center justify-between gap-2">
      <h1 className="text-2xl font-semibold">All Projects</h1>
      <Button variant="default" size="default" className="rounded-3xl">
        Add Project
        <Plus />
      </Button>
    </header>
  )
}
