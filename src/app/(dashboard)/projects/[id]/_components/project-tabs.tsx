"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import OverviewTab from "./tabs/overview";
import TasksTab from "./tabs/tasks";
import TeamsTab from "./tabs/teams";
import FilesTab from "./tabs/files";
import type { ProjectAssignedTeam, ProjectOverview } from "@/types/project";
const tabs = ["Overview", "Tasks", "Teams", "Files"];
interface ProjectTabsProps {
  project: ProjectOverview;
  teams: ProjectAssignedTeam[];
  areTeamsLoading: boolean;
  teamsError: Error | null;
  progressPercentage: number;
  completedTasks: number;
  totalTasks: number;
  year: number;
  onYearChange: (year: number) => void;
  isTasksLoading?: boolean
  isTeamsLoading?: boolean
  isFilesLoading?: boolean
}

const ProjectTabs = ({
  project,
  teams,
  areTeamsLoading,
  teamsError,
  progressPercentage,
  completedTasks,
  totalTasks,
  year,
  onYearChange,
  isTasksLoading = false,
  isTeamsLoading = false,
  isFilesLoading = false,
}: ProjectTabsProps) => {
  const tabContents = [
    {
      value: "overview",
      component: (
        <OverviewTab
          project={project}
          teams={teams}
          areTeamsLoading={areTeamsLoading}
          teamsError={teamsError}
          progressPercentage={progressPercentage}
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          year={year}
          onYearChange={onYearChange}
        />
      ),
    },
    {
      value: "tasks",
      component: (
        <TasksTab projectId={project.id} isLoading={isTasksLoading} />
      ),
    },
    {
      value: "teams",
      component: (
        <TeamsTab
          teams={teams}
          isLoading={areTeamsLoading || isTeamsLoading}
          error={teamsError}
        />
      ),
    },
    {
      value: "files",
      component: (
        <FilesTab projectId={project.id} isLoading={isFilesLoading} />
      ),
    },
  ]

  return (
    <Tabs defaultValue="overview" className="w-full mt-5">
    {/* -----------------------------------Tabs List ----------------------------------------------------------------------------------------------------- */}
      <TabsList className="h-auto w-full items-center justify-start gap-7 rounded-none border-b border-gray-100 bg-transparent p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab.toLowerCase()}
          
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {/* -----------------------------------Tabs Content----------------------------------------------------------------------------------------------------- */}
      {tabContents.map((content)=>(
        <TabsContent key={content.value} value={content.value}>
          {content.component}
        </TabsContent>
      ))}
  
    </Tabs>
  );
};

export default ProjectTabs;