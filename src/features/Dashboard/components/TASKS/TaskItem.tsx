import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/utils/cn"
import { Priority, Task } from "../../types/typesDashboard"

export default function TaskItem({ task }: { task: Task }) {
   const BAR = "h-1.5 bg-blue-100 [&>div]:bg-blue-600"
    const priorityStyles: Record<Priority, string> = {
        High: "bg-red-100 text-red-500 hover:bg-red-100",
        Medium: "bg-yellow-100 text-yellow-600 hover:bg-yellow-100",
        Low: "bg-green-100 text-green-600 hover:bg-green-100",
      }
      
      

    return (
      <li className="rounded-xl border border-border/60 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-medium">{task.title}</h3>
          <Badge
            variant="secondary"
            className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", priorityStyles[task.priority])}
          >
            {task.priority}
          </Badge>
        </div>
  
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>{task.due}</span>
          <span className="tabular-nums">{task.progress}%</span>
        </div>
        <Progress
          value={task.progress}
          aria-label={`${task.title}: ${task.progress}%`}
          className={cn("mt-1.5", BAR)}
        />
      </li>
    )
  }