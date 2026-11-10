
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

import type {
  SelectedChat,
  ChatChannel,
  ChatProject,
  ChatConversation,
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

  const handleSelectDirectMessage = (
    conversation: ChatConversation
  ) => {
    onSelectChat({
      type: "direct",
      conversation,
    });
  };

  const handleSelectChannel = (
    channel: ChatChannel,
    project: ChatProject
  ) => {
    onSelectChat({
      type: "channel",
      channel,
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
            conversations={directConversations}
            searchQuery={searchQuery}
            onSelectChat={handleSelectDirectMessage}
          />
        ) : (
          <ProjectChatList
            projects={chatProjects.map((project) => ({
              ...project,
              time: "",
            }))}
            searchQuery={searchQuery}
            onSelectChannel={handleSelectChannel}
          />
        )}
      </div>
    </aside>
  );
}
