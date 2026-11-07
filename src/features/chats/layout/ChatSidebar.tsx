
"use client";

import { useState } from "react";

import SidebarHeader from "@/features/chats/sidebar/SidebarHeader";
import ChatTabs, {
  type ChatTabType,
} from "@/features/chats/sidebar/ChatTabs";
import ChatSearch from "@/features/chats/sidebar/ChatSearch";

import DirectMessageList from "@/features/chats/sidebar/DirectMessageList";
import ProjectChatList from "@/features/chats/sidebar/ProjectChatList";

import {
  directConversations,
  chatProjects,
} from "@/features/chats/data/mockChats";

export default function ChatSidebar() {
  const [activeTab, setActiveTab] =
    useState<ChatTabType>("inbox");

  const [searchQuery, setSearchQuery] = useState("");

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

      <div className="flex-1 overflow-y-auto">
        {activeTab === "inbox" ? (
          <DirectMessageList
            messages={directConversations}
            searchQuery={searchQuery}
          />
        ) : (
          <ProjectChatList
            projects={chatProjects.map((project) => ({
              ...project,
              time: "",
            }))}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </aside>
  );
}
