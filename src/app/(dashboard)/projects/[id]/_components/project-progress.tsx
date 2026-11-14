import type { ProjectOverview } from "@/types/project"

interface ProjectProgressProps {
  project: ProjectOverview
  progressPercentage: number
  completedTasks: number
  totalTasks: number
}

const ProjectProgress = ({
  project,
  progressPercentage,
  completedTasks,
  totalTasks,
}: ProjectProgressProps) => {
  const progress = Math.min(Math.max(progressPercentage, 0), 100)
  //1- to draw  Needle angle based on progress percentage
  const angle = Math.PI + (progress / 100) * Math.PI;

  const needleLength = 55;

  const needleX = 100 + needleLength * Math.cos(angle);
  const needleY = 85 + needleLength * Math.sin(angle);
  const tasks = project?.tasks_statistics

  return (
    <section className="w-full  rounded-xl bg-white p-3 ">
      {/* Header */}
      <h3 className="text-sm font-semibold text-gray-800">
        Project Progress
      </h3>

      {/* Gauge */}
      <div className="flex flex-col items-center mt-3">

        <svg
          viewBox="0 0 200 110"
          className="w-45 h-45"
        >
          {/* Background Arc */}
          <path
            d="M 25 85 A 75 75 0 0 1 175 85"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Progress Arc */}
          <path
            d="M 25 85 A 75 75 0 0 1 175 85"
            fill="none"
            stroke="#262626"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 235.62} 235.62`}
          />
          {/* Needle */}
          <line
            x1="100"
            y1="85"
            x2={needleX}
            y2={needleY}
            stroke="#262626"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Needle Center Circle */}
          <circle
            cx="100"
            cy="85"
            r="8"
            fill="white"
            stroke="#262626"
            strokeWidth="2"
          />
        </svg>

        {/* Percentage */}
        <div className="flex flex-col items-center -mt-1">
          <span className="text-sm font-semibold text-gray-800">
            {progressPercentage}%
          </span>

          <span className="text-[9px] text-gray-600">
            Project Completed
          </span>
          <span className="mt-1 text-[9px] text-gray-500">
            Tasks completed: {completedTasks}/{totalTasks}
          </span>
        </div>
      </div>

      {/* Tasks Statistics */}
      <div className="flex items-end justify-between mt-8 gap-2">

        {[
          { label: "Pending", value: tasks.pending, color: "bg-gray-400" },
          { label: "In progress", value: tasks.in_progress, color: "bg-blue-500" },
          { label: "In review", value: tasks.in_review, color: "bg-yellow-500" },
          { label: "Completed", value: tasks.completed, color: "bg-green-500" },
        ].map((task) => (
          <div key={task.label} className="flex min-w-0 flex-col gap-1">
            <p className="text-xs font-semibold text-gray-800">
              {task.value}<span className="font-normal text-gray-400">/{tasks.total}</span>
            </p>
            <div className="flex items-center gap-1">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${task.color}`} />
              <span className="truncate text-[9px] text-gray-500">
                {task.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectProgress;