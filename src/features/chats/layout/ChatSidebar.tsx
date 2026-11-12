
"use client";

import { useState } from "react";

import SidebarHeader from "@/features/chats/sidebar/SidebarHeader";
import ChatTabs, {
  type ChatTabType,
} from "@/features/chats/sidebar/ChatTabs";
import ChatSearch from "@/features/chats/sidebar/ChatSearch";

import DirectMessageList from "@/features/chats/sidebar/DirectMessageList";
import ProjectChatList from "@/features/chats/sidebar/ProjectChatList";

import { useProjects } from "@/features/chats/hooks/useProjects";

import type {
  SelectedChat,
  ChatProject,
} from "@/features/chats/types/chat.types";

interface ChatSidebarProps {
  onSelectChat: (chat: SelectedChat) => void;
}

export default function ChatSidebar({
  onSelectChat,
}: ChatSidebarProps) {
  const [activeTab, setActiveTab] =
    useState<ChatTabType>("inbox");

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useProjects();

  const handleSelectProject = (project: ChatProject) => {
    onSelectChat({
      type: "channel",
     channel: {
  id: project.id,
  name: project.name,
  description: "Project discussion",
  unreadCount: 0,
},
      project,
    });
  };

  return (
    <aside className="flex h-full flex-col">
      <SidebarHeader />

      <ChatSearch
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <ChatTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        {activeTab === "inbox" ? (
          <DirectMessageList
            conversations={[]}
            searchQuery={searchQuery}
            onSelectChat={() => {}}
          />
        ) : isLoading ? (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            Loading projects...
          </p>
        ) : isError ? (
          <p className="px-4 py-6 text-center text-sm text-destructive">
            Failed to load projects.
          </p>
        ) : (
          <ProjectChatList
            projects={projects.map((project) => ({
              id: project.id,
              name: project.name,
              channels: [],
            }))}
            searchQuery={searchQuery}
            onSelectProject={handleSelectProject}
          />
        )}
      </div>
    </aside>
  );
}
