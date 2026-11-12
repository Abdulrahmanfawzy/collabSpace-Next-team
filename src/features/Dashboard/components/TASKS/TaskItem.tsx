import { Badge } from "@/components/ui/badge"
import { cn } from "@/utils/cn"
import { Priority, Task } from "../../types/typesDashboard"

export default function TaskItem({ task }: { task: Task }) {
    const priorityStyles: Record<Priority, string> = {
        critical: "bg-red-100 text-red-700 hover:bg-red-100",
        high: "bg-red-100 text-red-500 hover:bg-red-100",
        medium: "bg-yellow-100 text-yellow-600 hover:bg-yellow-100",
        low: "bg-green-100 text-green-600 hover:bg-green-100",
      }
      
      

    return (
      <li className="rounded-xl border border-border/60 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-medium">{task.name}</h3>
          <Badge
            variant="secondary"
            className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", priorityStyles[task.priority])}
          >
            {task.priority}
          </Badge>
        </div>
  
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Due {task.due_date}</span>
          <span className="tabular-nums">{task.status_label}</span>
        </div>
      </li>
    )
  }
