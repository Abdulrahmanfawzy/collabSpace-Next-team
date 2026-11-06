import { AreaChart } from "@/components/common/charts"
import ProjectDescription from "../project-description"
import ProjectDetails from "../project-details"

import TeamMembers from "../project-members"
import ProjectProgress from "../project-progress"
import OverviewProjectsSkeleton from "@/components/skeletons/overview-projects-skeleton"


const projectData = [
  12500, 14615, 15769, 15577, 14423, 12308, 10000, 10000, 14231,
  18846, 23077, 19423, 17500, 8654, 11923, 15577, 14615, 11731,
  9808, 11923, 15962,
].map((value, index) => ({
  label: String(index),
  value,
}))

const OverviewTab = ({ isLoading = false }: { isLoading?: boolean }) => {
    if(isLoading){
        return (<OverviewProjectsSkeleton/>);
    }
  return (
    <section className="my-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
       {/*------------------------ left section------------------------------------------------------ */}

      <div className="lg:col-span-2 flex flex-col gap-4">
        <ProjectDescription
          description="This project focuses on organizing tasks, tracking progress, and coordinating team efforts to ensure timely delivery and clear visibility across all project activities."
        />
         {/* --------------------------------------------------------------------------------------- */}
        <div className="space-y-6">
          <AreaChart
            title="Project overview"
            data={projectData}
            maxValue={25000}
            steps={5}
            height={155}
            color="#3B82F6"
            xAxisLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
            filters={[
              { label: "All Projects" },
              { label: "This Year" },
            ]}
          />
        </div>
      {/* ------------------------------------------------------------------------------------------ */}
        <ProjectDetails />
      </div>
      {/*------------------------ right section------------------------------------------------------ */}
      <div className="flex flex-col gap-4">
        
        <ProjectProgress  />
        
        <TeamMembers/>
      </div>
    </section>
  )
}

export default OverviewTab