import { Breadcrumb } from "@/components/common/breadcrumb"

interface ProjectHeaderProps {
  projectName: string
}

const ProjectHeader = ({ projectName }: ProjectHeaderProps) => {
    return (

        <div className="flex flex-col md:flex-row justify-between gap-2 items-start md:items-center">
            <div className="flex flex-col items-start justify-start gap-2">
                <Breadcrumb
                    items={[
                        { label: "Projects", href: "/projects" },
                        { label: projectName },
                    ]}
                />
                {/* Header */}
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-semibold text-black">
                        {projectName}
                    </h1>
                    <span className="rounded-[100px] bg-support-green-light p-2 text-sm  text-support-green-hover">
                        42% Completed
                    </span>
                </div>
            </div>
            {/* Due Date Card */}
            <div className=" md:min-w-81 rounded-xl border border-[#F3F4F6] bg-white p-3 ">
               
                <span className="text-text-dark text-sm">Due Date</span>
                <div className="mt-2 h-1.5 w-full  rounded-full bg-gray-100">
                    <div className="h-full w-[42%] rounded-full bg-primary" />
                </div>
                <div className="mt-2 flex justify-between text-xs text-neutral-deep">
                    <span>Start Date: Oct 12</span>
                    <span>Deadline: Dec 25</span>
                </div>
            </div>
        </div>

    )
}

export default ProjectHeader