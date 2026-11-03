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

const tabs = ["Overview", "Tasks", "Teams", "Files"];

const ProjectTabs = () => {
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
      <TabsContent value="overview">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="tasks">
        <TasksTab />
      </TabsContent>

      <TabsContent value="teams">
        <TeamsTab />
      </TabsContent>

      <TabsContent value="files">
        <FilesTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProjectTabs;