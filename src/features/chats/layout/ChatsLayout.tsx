
import ChatPanel from "@/features/chats/panel/ChatPanel";
import ChatSidebar from "@/features/chats/layout/ChatSidebar";

export default function ChatsLayout() {
  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden">
      <aside className="h-full w-80 shrink-0 border-r border-border">
        <ChatSidebar />
      </aside>

      <ChatPanel hasSelectedChat={false} />
    </div>
  );
}
