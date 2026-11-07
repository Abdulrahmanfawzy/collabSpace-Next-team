
import DirectMessageItem from "@/features/chats/sidebar/DirectMessageItem";
import type { ChatConversation } from "@/features/chats/types/chat.types";

interface DirectMessageListProps {
  messages: ChatConversation[];
  searchQuery?: string;
}

export default function DirectMessageList({
  messages,
  searchQuery = "",
}: DirectMessageListProps) {
  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Recent
        </h3>
      </div>

      {filteredMessages.length > 0 ? (
        <div className="flex flex-col">
          {filteredMessages.map((message) => (
            <DirectMessageItem
              key={message.id}
              message={message}
            />
          ))}
        </div>
      ) : (
        <p className="px-4 py-6 text-center text-sm text-muted-foreground">
          No conversations found.
        </p>
      )}
    </div>
  );
}
