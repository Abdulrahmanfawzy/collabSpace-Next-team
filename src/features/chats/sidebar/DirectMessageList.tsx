
import type { ChatConversation, SelectedChat } from "@/features/chats/types/chat.types";

interface DirectMessageListProps {
  conversations: ChatConversation[];
  searchQuery?: string;
  onSelectChat: (conversation: ChatConversation) => void;
}

export default function DirectMessageList({
  conversations,
  searchQuery = "",
  onSelectChat,
}: DirectMessageListProps) {
  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Recent
        </h3>
      </div>

      {filteredConversations.length > 0 ? (
        filteredConversations.map((conversation) => (
          <button
            key={conversation.id}
            type="button"
            onClick={() => onSelectChat(conversation)}
            className="flex items-center gap-3 px-4 py-3 text-left hover:bg-muted"
          >
            <span className="text-sm font-medium">
              {conversation.name}
            </span>
          </button>
        ))
      ) : (
        <p className="px-4 py-6 text-center text-sm text-muted-foreground">
          No conversations yet.
        </p>
      )}
    </div>
  );
}
