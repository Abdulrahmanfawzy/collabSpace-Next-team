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
const tabContents=[
  {
   'value':'overview',
   'component':<OverviewTab />
  },
   {
   'value':'tasks',
   'component':<TasksTab />
  },
   {
   'value':'teams',
   'component':<TeamsTab />
  },
   {
   'value':'files',
   'component':<FilesTab />
  },
]
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
      {tabContents.map((content)=>(
        <TabsContent key={content.value} value={content.value}>
          {content.component}
        </TabsContent>
      ))}
  
    </Tabs>
  );
};

export default ProjectTabs;