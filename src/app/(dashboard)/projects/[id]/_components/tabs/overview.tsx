import { AreaChart } from "@/components/common/charts"
import ProjectDescription from "../project-description"
import ProjectDetails from "../project-details"

import TeamMembers from "../project-members"
import ProjectProgress from "../project-progress"
import OverviewProjectsSkeleton from "@/components/skeletons/overview-projects-skeleton"
import {  ProjectOverview } from "@/types/project"




interface OverviewTabProps {
  isLoading?: boolean;
  project: ProjectOverview;
  year:number,
  onYearChange: (year: number) => void;
}
const OverviewTab = ({ isLoading = false, project,year,onYearChange }: OverviewTabProps) => {
    if(isLoading){
        return (<OverviewProjectsSkeleton/>);
    }
     const chartData = project.chart.data.map((item) => ({
    label: item.month,
    value: item.created_tasks,
  }));

  const maxValue = Math.max(
    ...chartData.map((item) => item.value),
    1
  );
  return (
    <section className="my-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
       {/*------------------------ left section------------------------------------------------------ */}

      <div className="lg:col-span-2 flex flex-col gap-4">
        <ProjectDescription
          description={project?.description}
        />
         {/* --------------------------------------------------------------------------------------- */}
        <div className="space-y-6">
         <AreaChart
            title="Project overview"
            data={chartData}
            maxValue={maxValue}
            steps={5}
            height={155}
            color="#3B82F6"
            xAxisLabels={project.chart.data.map((item) => item.month)}
            valueFormatter={(value) => String(value)}
            valueLabel="Created Tasks"
            filters={[
              {
                label: "Year",
                value: String(year),
                options: [
                  { label: "2025", value: "2025" },
                  { label: "2026", value: "2026" },
                  { label: "2027", value: "2027" },
                ],
                onChange: (value) => onYearChange(Number(value)),
              },
            ]}
          
          />
        </div>
      {/* ------------------------------------------------------------------------------------------ */}
        <ProjectDetails project={project} />
      </div>
      {/*------------------------ right section------------------------------------------------------ */}
      <div className="flex flex-col gap-4">
        
        <ProjectProgress project={project} />
        
        <TeamMembers teams={project.teams} members={project.direct_members} />
      </div>
    </section>
  )
}

export default OverviewTab