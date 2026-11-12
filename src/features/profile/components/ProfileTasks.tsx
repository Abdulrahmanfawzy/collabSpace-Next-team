import { CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type ProfileTask as ProfileTaskType } from "../types/profile.types";

type TaskListProps = {
  title: string;
  tasks: ProfileTaskType[];
  variant: "todo" | "done";
};

function TaskList({ title, tasks, variant }: TaskListProps) {
  const isDone = variant === "done";

  return (
    <Card className="gap-0 overflow-hidden rounded-lg border border-border bg-bg-white py-0 shadow-none">
      <CardHeader
        className={`flex flex-row items-center justify-between px-3 py-2 ${isDone ? "bg-support-green-light" : "bg-gray-05"
          }`}
      >
        <CardTitle
          className={`text-[11px] font-medium md:text-[20px] ${isDone ? "text-support-green" : "text-text-primary"
            }`}
        >
          {title}
        </CardTitle>

        <span
          className={`text-[9px] md:text-[13px] ${isDone ? "text-support-green" : "text-text-secondary"
            }`}
        >
          {tasks.length}
        </span>
      </CardHeader>

      <CardContent className="px-2 py-2">
        <div className="mb-1 flex items-center justify-between px-0.5 text-[8px] text-text-body md:text-[12px]">
          <span>Name</span>
          <span>Progress</span>
        </div>

        <div>
          {tasks.length === 0 ? (
            <p className="py-4 text-center text-sm text-text-secondary">
              No tasks found.
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 border-b border-border py-1.75 last:border-b-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="mb-1.25 truncate text-[9px] font-normal text-text-primary md:text-[14px]">
                    {task.name}
                  </p>

                  <Progress
                    value={task.project?.progress_percentage ?? 0}
                    aria-label={`${task.name} project progress`}
                    className={`h-1 rounded-none bg-gray-05 ${isDone
                        ? "[&>div]:bg-support-green"
                        : "[&>div]:bg-primary"
                      }`}
                  />
                </div>

                <span className="shrink-0 text-xs text-text-secondary">
                  {task.status}
                </span>

                {isDone && (
                  <CheckCircle2
                    aria-label="Completed"
                    className="size-5 shrink-0 text-support-green"
                    strokeWidth={1.5}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ProfileTasksProps {
  tasks: ProfileTaskType[];
}

export default function ProfileTasks({ tasks }: ProfileTasksProps) {
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const todoTasks = tasks.filter((task) => task.status !== "Completed");

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TaskList title="To do" tasks={todoTasks} variant="todo" />
        <TaskList title="Done" tasks={completedTasks} variant="done" />
      </div>
    </section>
  );
}