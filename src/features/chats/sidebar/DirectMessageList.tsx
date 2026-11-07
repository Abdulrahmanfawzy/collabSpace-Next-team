import DirectMessageItem from "@/features/chats/sidebar/DirectMessageItem";

export interface DirectMessage {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  unreadCount?: number;
  isOnline?: boolean;
}

interface DirectMessageListProps {
  messages: DirectMessage[];
  searchQuery?: string;
}

export default function DirectMessageList({
  messages,
  searchQuery = "",
}: DirectMessageListProps) {
  const filteredMessages = messages.filter((message) =>
    message.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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
              message={{ ...message, isOnline: message.isOnline ?? false }}
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