import { CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { todoTasks, completedTasks } from "../data/mock-profile";
import { type ProfileTask } from "../types/profile.types";


type TaskListProps = {
  title: string;
  tasks: ProfileTask[];
  variant: "todo" | "done";
};

function TaskList({ title, tasks, variant }: TaskListProps) {
  const isDone = variant === "done";

  return (
    <Card className="gap-0 overflow-hidden rounded-lg border border-border bg-bg-white py-0 
    shadow-none">
      <CardHeader
        className={`flex flex-row items-center justify-between px-3 py-2 ${
          isDone ? "bg-support-green-light" : "bg-gray-05"
        }`}
      >
        <CardTitle
          className={`text-[11px] md:text-[20px] font-medium ${
            isDone ? "text-support-green" : "text-text-primary"
          }`}
        >
          {title}
        </CardTitle>

        <span
          className={`text-[9px] md:text-[13px] ${
            isDone ? "text-support-green" : "text-text-secondary"
          }`}
        >
          {tasks.length}
        </span>
      </CardHeader>

      <CardContent className="px-2 py-2">
        <div className="mb-1 flex items-center justify-between px-0.5 text-[8px] md:text-[12px] text-text-body">
          <span>Name</span>
          <span>Tasks</span>
        </div>

        <div>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-2 border-b border-border py-1.75 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <p className="mb-1.25 truncate text-[9px] md:text-[14px] font-normal text-text-primary">
                  {task.name}
                </p>

                <Progress
                  value={task.progress}
                  className={`h-1 rounded-none bg-gray-05 ${
                    isDone ? "[&>div]:bg-support-green" : "[&>div]:bg-primary"
                  }`}
                />
              </div>

              {isDone && (
                <CheckCircle2
                  aria-label="Completed"
                  className="size-5 shrink-0 text-support-green"
                  strokeWidth={1.5}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProfileTasks() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TaskList title="To do" tasks={todoTasks} variant="todo" />

        <TaskList title="Done" tasks={completedTasks} variant="done" />
      </div>
    </section>
  );
}
