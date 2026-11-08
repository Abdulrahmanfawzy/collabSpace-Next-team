
import type { ChatConversation } from "@/features/chats/types/chat.types";

import DirectMessageItem from "@/features/chats/sidebar/DirectMessageItem";

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
    conversation.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
console.log("Conversations:", conversations);
console.log("Filtered:", filteredConversations);
  return (
    <div className="flex flex-col">
      <div className="px-4 pb-3 pt-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Recent
        </h3>
      </div>

      {filteredConversations.length > 0 ? (
        <div className="flex flex-col">
          {filteredConversations.map((conversation) => (
            <DirectMessageItem
              key={conversation.id}
              message={conversation}
              onSelect={() => onSelectChat(conversation)}
            />
          ))}
        </div>
      ) : (
        <p className="px-4 py-8 text-center text-sm text-muted-foreground">
          {searchQuery.trim()
            ? "No conversations found."
            : "No conversations yet."}
        </p>
      )}
    </div>
  );
}
