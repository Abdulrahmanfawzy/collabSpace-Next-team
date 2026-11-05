import { Briefcase } from "lucide-react";
import { ActiveProject, ProjectColor } from "../types/typesDashboard";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils/cn";

export default function ProjectItem({ project }: { project: ActiveProject }) {
 
      
    const projectColors: Record<ProjectColor, { badge: string; track: string; bar: string }> = {
        purple: {
          badge: "bg-purple-100 text-purple-800",
          track: "bg-purple-100/60",
          bar: "[&>div]:bg-purple-800",
        },
        teal: {
          badge: "bg-teal-100 text-teal-600",
          track: "bg-teal-100/60",
          bar: "[&>div]:bg-teal-500",
        },
      }
      
      
    const c = projectColors[project.color ?? "purple"]
    const percent = project.total > 0 ? (project.done / project.total) * 100 : 0
  
    return (
      <li className="rounded-xl border border-border/60 p-3">
        <div className="flex items-center gap-3">
          <span className={cn("grid size-10 place-items-center rounded-full", c.badge)}>
            <Briefcase className="size-5" aria-hidden />
          </span>
          <h3 className="text-base font-medium">{project.name}</h3>
        </div>
  
        <Progress
          value={percent}
          aria-label={`${project.name}: ${project.done} of ${project.total} tasks`}
          className={cn("mt-3 h-2", c.track, c.bar)}
        />
        <p className="mt-2 text-sm tabular-nums text-muted-foreground">
          Task: {project.done} /{project.total}
        </p>
      </li>
    )
  }