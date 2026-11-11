import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActiveProjectsProps } from "../types/typesDashboard"
import Link from "next/link"
import ProjectItem from "./ProjectItems"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ActiveProjects({ projects, viewAllHref = "/projects" }: ActiveProjectsProps) {
  return (
    <Card className="flex h-85 flex-col rounded-2xl border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0  pb-3">
        <CardTitle className="text-xl font-medium">Active Projects</CardTitle>
        <Link href={viewAllHref} className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-5 pt-0">
        <ScrollArea className="min-h-0 flex-1 pr-3">
          <ul className="space-y-4">
            {projects.map((p) => (
              <ProjectItem key={p.id} project={p} />
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
