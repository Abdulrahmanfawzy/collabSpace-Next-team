import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActiveProjectsProps } from "../types/typesDashboard"
import Link from "next/link"
import ProjectItem from "./ProjectItems"

export function ActiveProjects({ projects, viewAllHref = "/projects" }: ActiveProjectsProps) {
  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 pb-3">
        <CardTitle className="text-xl font-medium">Active Projects</CardTitle>
        <Link href={viewAllHref} className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <ul className="space-y-4">
          {projects.map((p) => (
            <ProjectItem key={p.id} project={p} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}