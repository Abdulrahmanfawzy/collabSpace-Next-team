
import EmptyState from "@/features/chats/panel/EmptyState";
import Conversation from "@/features/chats/panel/conversation/Conversation";

interface ChatPanelProps {
  hasSelectedChat: boolean;
}

export default function ChatPanel({
  hasSelectedChat,
}: ChatPanelProps) {
  return (
    <main className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
      {hasSelectedChat ? (
        <Conversation />
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
