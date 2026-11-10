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
import type { ProjectOverview } from "@/types/project";
const files = [
  {
    id: 1,
    name: "Design mockups",
    uploadedBy: "Ahmed Hassan",
    size: "6.4 MB",
    uploadedAt: "1h ago",
    downloadUrl: "/files/design-mockups.pdf",
  },
  {
    id: 2,
    name: "Project Requirements",
    uploadedBy: "Ahmed Hassan",
    size: "2.5 MB",
    uploadedAt: "2h ago",
    downloadUrl: "/files/requirements.pdf",
  },
   {
    id: 3,
    name: "Project Requirements",
    uploadedBy: "Ahmed Hassan",
    size: "2.5 MB",
    uploadedAt: "2h ago",
    downloadUrl: "/files/requirements.pdf",
  },
];
const tabs = ["Overview", "Tasks", "Teams", "Files"];
interface ProjectTabsProps {
  project: ProjectOverview
  isTasksLoading?: boolean
  isTeamsLoading?: boolean
  isFilesLoading?: boolean
}

const ProjectTabs = ({
  project,
  isTasksLoading = false,
  isTeamsLoading = false,
  isFilesLoading = false,
}: ProjectTabsProps) => {
  const tabContents = [
    {
      value: "overview",
      component: <OverviewTab project={project} />,
    },
    {
      value: "tasks",
      component: <TasksTab isLoading={isTasksLoading} />,
    },
    {
      value: "teams",
      component: <TeamsTab isLoading={isTeamsLoading} />,
    },
    {
      value: "files",
      component: <FilesTab files={files} isLoading={isFilesLoading} />,
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