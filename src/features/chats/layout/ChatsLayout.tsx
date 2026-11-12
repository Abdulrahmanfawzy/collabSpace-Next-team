"use client";

import { useState } from "react";

import ChatPanel from "@/features/chats/panel/ChatPanel";
import ChatSidebar from "@/features/chats/layout/ChatSidebar";

import type { SelectedChat } from "@/features/chats/types/chat.types";

export default function ChatsLayout() {
  const [selectedChat, setSelectedChat] = useState<SelectedChat>(null);

  const handleBack = () => {
    setSelectedChat(null);
  };

  return (
    <div className="flex h-[calc(100dvh-4rem)] min-h-0 w-full overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          h-full min-h-0 w-full shrink-0 flex-col border-r border-border
          md:flex md:w-72 lg:w-80
          ${selectedChat ? "hidden" : "flex"}
        `}
      >
        <ChatSidebar onSelectChat={setSelectedChat} />
      </aside>

      {/* Chat Panel */}
      <section
        className={`
          min-h-0 min-w-0 flex-1 flex-col overflow-hidden
          ${selectedChat ? "flex" : "hidden md:flex"}
        `}
      >
        {/* Mobile Back Button */}
        {selectedChat && (
          <div className="flex shrink-0 items-center border-b border-border p-3 md:hidden">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <span aria-hidden="true">←</span>
              Back to chats
            </button>
          </div>
        )}

        <ChatPanel selectedChat={selectedChat} />
      </section>
    </div>
  );
}