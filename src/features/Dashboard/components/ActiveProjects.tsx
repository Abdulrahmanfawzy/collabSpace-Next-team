import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActiveProjectsProps } from "../types/typesDashboard"
import Link from "next/link"
import ProjectItem from "./ProjectItems"

export function ActiveProjects({ projects, viewAllHref = "/projects" }: ActiveProjectsProps) {
  return (
    <Card className="flex h-full min-h-[22rem] flex-col rounded-2xl border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0  pb-3">
        <CardTitle className="text-xl font-medium">Active Projects</CardTitle>
        <Link href={viewAllHref} className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto p-5 pt-0">
        {projects.length ? <ul className="space-y-3">
          {projects.map((p) => (
            <ProjectItem key={p.id} project={p} />
          ))}
        </ul> : <p className="py-8 text-center text-sm text-muted-foreground">No active projects yet.</p>}
      </CardContent>
    </Card>
  )
}
