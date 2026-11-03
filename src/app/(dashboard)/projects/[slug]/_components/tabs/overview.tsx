import { AreaChart } from "@/components/common/charts"
import ProjectDescription from "../project-description"

const projectData = [
  12500, 14615, 15769, 15577, 14423, 12308, 10000, 10000, 14231,
  18846, 23077, 19423, 17500, 8654, 11923, 15577, 14615, 11731,
  9808, 11923, 15962,
].map((value, index) => ({
  label: String(index),
  value,
}))

const OverviewTab = () => {
  return (
    <section className="mt-6 flex gap-2">
      <div className="flex flex-col">
        <ProjectDescription
          description="This project focuses on organizing tasks, tracking progress, and coordinating team efforts to ensure timely delivery and clear visibility across all project activities."
        />
        {/* project overview */}
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
        {/* project details */}
        <div></div>
      </div>
      <div className="flex flex-col">
        {/* project progress */}
        <div></div>
        {/* project members */}
        <div></div>
      </div>
    </section>
  )
}

export default OverviewTab