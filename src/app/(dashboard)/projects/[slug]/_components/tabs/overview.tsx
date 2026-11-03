import ProjectDescription from "../project-description"

const OverviewTab = () => {
  return (
    <section className="mt-6 flex gap-2">
        <div className="flex flex-col ">
            
            <ProjectDescription 
            description=" This project focuses on organizing tasks, tracking progress, and
                           coordinating team efforts to ensure timely delivery and clear
                           visibility across all project activities." />
            {/* project overview */}
            <div></div>
            {/* project details */}
            <div></div>
        </div>
        <div className="flex flex-col ">
            {/* project progress */}
            <div></div>
            {/* project members */}
            <div></div>
        </div>
      
    </section>
  )
}

export default OverviewTab