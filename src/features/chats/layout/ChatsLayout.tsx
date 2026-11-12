
"use client";

import { useState } from "react";

import ChatPanel from "@/features/chats/panel/ChatPanel";
import ChatSidebar from "@/features/chats/layout/ChatSidebar";

import type { SelectedChat } from "@/features/chats/types/chat.types";
import type { AuthUser } from "@/features/auth/types/auth.types";

interface ChatsLayoutProps {
  user: AuthUser | null;
}

export default function ChatsLayout({ user }: ChatsLayoutProps) {
  const [selectedChat, setSelectedChat] = useState<SelectedChat>(null);

  return (
    <div className="flex h-[calc(100dvh-4rem)] min-h-0 w-full overflow-hidden">
      <aside
        className={`
          h-full min-h-0 w-full shrink-0 flex-col border-r border-border
          md:flex md:w-72 lg:w-80
          ${selectedChat ? "hidden" : "flex"}
        `}
      >
        <ChatSidebar
          user={user}
          onSelectChat={setSelectedChat}
        />
      </aside>

      <section
        className={`
          min-h-0 min-w-0 flex-1 flex-col overflow-hidden
          ${selectedChat ? "flex" : "hidden md:flex"}
        `}
      >
        {selectedChat && (
          <div className="flex shrink-0 items-center border-b border-border p-3 md:hidden">
            <button
              type="button"
              onClick={() => setSelectedChat(null)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <span aria-hidden="true">←</span>
              Back to chats
            </button>
          </div>
        )}

        <ChatPanel
          selectedChat={selectedChat}
          user={user}
        />
      </section>
    </div>
  );
}
