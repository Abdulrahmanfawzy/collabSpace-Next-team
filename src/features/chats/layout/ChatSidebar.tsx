
"use client";

import { useState } from "react";

import SidebarHeader from "@/features/chats/sidebar/SidebarHeader";
import ChatTabs, {
  type ChatTabType,
} from "@/features/chats/sidebar/ChatTabs";

export default function ChatSidebar() {
  const [activeTab, setActiveTab] =
    useState<ChatTabType>("inbox");

  return (
    <aside>
      <SidebarHeader />

      <ChatTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "inbox" ? (
        <div>Direct Messages</div>
      ) : (
        <div>Project Chats</div>
      )}
    </aside>
  );
}
