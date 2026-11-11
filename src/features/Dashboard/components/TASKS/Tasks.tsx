"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import TaskItem from "./TaskItem"
import { Task, TeamMember } from "../../types/typesDashboard"
import { ScrollArea } from "@/components/ui/scroll-area"


export type TasksProps = {
  tasks: Task[]
  viewAllHref?: string
}
export function Tasks({ tasks, viewAllHref = "/tasks" }: TasksProps) {
  return (
    <Card className="flex h-105 flex-col rounded-2xl border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0  pb-3">
        <CardTitle className="text-xl font-medium">Tasks</CardTitle>
        <Link href={viewAllHref} className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-5 pt-0">
        <ScrollArea className="min-h-0 flex-1 pr-3">
          <ul className="space-y-4">
            {tasks.map((t) => (
              <TaskItem key={t.id} task={t} />
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}








export default Tasks
