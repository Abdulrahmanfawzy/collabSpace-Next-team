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
import type { TaskAssigneeOption } from "@/types/tasks.types";
import { useProjectPermissions } from "../../_components/use-project-permissions";
interface ProjectTabsProps {
  project: ProjectOverview;
  teams: ProjectAssignedTeam[];
  projectAssignees: TaskAssigneeOption[];
  areTeamsLoading: boolean;
  teamsError: Error | null;
  progressPercentage: number;
  completedTasks: number;
  totalTasks: number;
  year: number;
  onYearChange: (year: number) => void;
  isChartLoading?: boolean;
  chartError?: Error | null;
  isTasksLoading?: boolean
  isTeamsLoading?: boolean
  isFilesLoading?: boolean
}

const ProjectTabs = ({
  project,
  teams,
  projectAssignees,
  areTeamsLoading,
  teamsError,
  progressPercentage,
  completedTasks,
  totalTasks,
  year,
  onYearChange,
  isChartLoading = false,
  chartError = null,
  isTasksLoading = false,
  isTeamsLoading = false,
  isFilesLoading = false,
}: ProjectTabsProps) => {
  const { canViewTasks, canViewTeams, canAssignProjectMember } =
    useProjectPermissions();
  const tabs = [
    "Overview",
    ...(canViewTasks ? ["Tasks"] : []),
    ...(canViewTeams ? ["Teams"] : []),
    "Files",
  ];
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
          canViewTeams={canViewTeams}
          year={year}
          onYearChange={onYearChange}
          isChartLoading={isChartLoading}
          chartError={chartError}
          canManageTeams={canAssignProjectMember}
        />
      ),
    },
    {
      value: "tasks",
      component: (
        <TasksTab
          projectId={project.id}
          assignees={projectAssignees}
          isLoading={isTasksLoading}
        />
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