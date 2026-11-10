import { Breadcrumb } from "@/components/common/breadcrumb"
import type { ProjectOverview } from "@/types/project"

interface ProjectHeaderProps {
  project: ProjectOverview
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
    const progress = Math.min(Math.max(project.progress_percentage, 0), 100)

    return (

        <div className="flex flex-col md:flex-row justify-between gap-2 items-start md:items-center">
            <div className="flex flex-col items-start justify-start gap-2">
                <Breadcrumb
                    items={[
                        { label: "Projects", href: "/projects" },
                        { label: project.name },
                    ]}
                />
                {/* Header */}
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-semibold text-black">
                        {project.name}
                    </h1>
                    <span className="rounded-[100px] bg-support-green-light p-2 text-sm text-support-green-hover">
                        {project.progress_percentage}% Completed
                    </span>
                </div>
            </div>
            {/* Due Date Card */}
            <div className=" md:min-w-81 rounded-xl border border-[#F3F4F6] bg-white p-3 mt-1.5 ">
                <div className="flex justify-between gap-2">
                    <span className="text-text-dark text-sm">Due Date</span>
                    <span className="text-xs text-neutral-deep">
                        {project.due_date_indicator.is_overdue
                            ? "Overdue"
                            : `${project.due_date_indicator.days_remaining} days remaining`}
                    </span>
                </div>
                <div className="mt-2 h-1.5 w-full  rounded-full bg-gray-100">
                    <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="mt-2 flex justify-between text-xs text-neutral-deep">
                    <span>Start: {project.due_date_indicator.start_date}</span>
                    <span>Deadline: {project.due_date_indicator.deadline}</span>
                </div>
            </div>
        </div>

    )
}

export default ProjectHeader