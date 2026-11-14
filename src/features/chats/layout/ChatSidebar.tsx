
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
import { hasPermission } from "@/utils/permission.utils";

import type { AuthUser } from "@/features/auth/types/auth.types";
import type {
  SelectedChat,
  ChatProject,
} from "@/features/chats/types/chat.types";

interface ChatSidebarProps {
  user: AuthUser | null;
  onSelectChat: (chat: SelectedChat) => void;
}

export default function ChatSidebar({
  user,
  onSelectChat,
}: ChatSidebarProps) {
  const [activeTab, setActiveTab] =
    useState<ChatTabType>("inbox");

  const [searchQuery, setSearchQuery] = useState("");

  // Administrator UI access
  const isAdministrator =
    user?.roles?.includes("Administrator") ?? false;

  // Project chat permission
  const canAccessProjectChats =
    isAdministrator ||
    hasPermission(user, "access_all_project_chats");

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
        ) : !canAccessProjectChats ? (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            You don't have permission to access project chats.
          </p>
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
