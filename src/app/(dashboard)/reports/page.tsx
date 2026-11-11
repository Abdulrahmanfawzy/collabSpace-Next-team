import React from 'react'
import RateCards from '../../../features/Reports/components/TaskReports'
import CompletionVsDeadline from '../../../features/Reports/components/completionDeadline'
import ProjectsProgress from '../../../features/Reports/components/ProjectProgress'

const Reports = () => {
  const values = [36, 44, 44, 50, 56, 56, 58, 58, 70, 70, 78, 95, 95, 100, 100, 100, 104, 100, 103, 100]

  return (
    <div>
        <RateCards  rates={[
        { id: "tasks", title: "Task Completion Rate", value: 70, change: 3 },
        { id: "projects", title: "Projects Completion Rate", value: 88, change: 6 },
        { id: "teams", title: "Teams Activity Rate", value: 67, change: -4 },
      ]}/>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
        <CompletionVsDeadline
      data={[
        { label: "Jan", value: 90 },
        { label: "Feb", value: 59 },
        { label: "Mar", value: 40 },
        { label: "Apl", value: 74 },
        { label: "May", value: 73 },
        { label: "Jun", value: 86 },
        { label: "Jun", value: 86 },
        { label: "Jun", value: 86 },
        { label: "Jun", value: 86 },
        { label: "Jun", value: 86 },
      ]} 
      />
      <ProjectsProgress 
       projects={["All Projects", "Project A", "Project B"]}
       data={values.map((value, x) => ({ x, value }))}
       ticks={[
         { x: 0.6, label: "Jan" },
         { x: 2.5, label: "Feb" },
         { x: 4.4, label: "Mar" },
         { x: 6.3, label: "Apl" },
         { x: 8.2, label: "May" },
         { x: 10.1, label: "Jun" },
         { x: 12.1, label: "2016" },
         { x: 14.2, label: "2017" },
         { x: 16.3, label: "2018" },
         { x: 18.4, label: "2019" },
       ]}/>
        </div>
    </div>
  )
}

export default Reports