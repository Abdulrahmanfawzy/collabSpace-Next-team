"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import TaskItem from "./TaskItem"
import { Task, TeamMember } from "../../types/typesDashboard"


export type TasksProps = {
  tasks: Task[]
  viewAllHref?: string
}
export function Tasks({ tasks, viewAllHref = "/tasks" }: TasksProps) {
  return (
    <Card className="rounded-2xl h-105 border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0  pb-3">
        <CardTitle className="text-xl font-medium">Tasks</CardTitle>
        <Link href={viewAllHref} className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <ul className="space-y-4">
          {tasks.map((t) => (
            <TaskItem key={t.id} task={t} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}








export default Tasks