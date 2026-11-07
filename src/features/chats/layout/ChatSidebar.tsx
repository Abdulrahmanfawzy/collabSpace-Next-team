
"use client";

import { useState } from "react";

import SidebarHeader from "@/features/chats/sidebar/SidebarHeader";
import ChatTabs, {
  type ChatTabType,
} from "@/features/chats/sidebar/ChatTabs";
import ChatSearch from "@/features/chats/sidebar/ChatSearch";

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
          <div>Direct Messages</div>
        ) : (
          <div>Project Chats</div>
        )}
      </div>
    </aside>
  );
}
