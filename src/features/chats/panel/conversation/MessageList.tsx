
import { messages } from "@/features/chats/data/messages";
import MessageBubble from "@/features/chats/panel/conversation/MessageBubble";
import DateDivider from "@/features/chats/panel/conversation/DateDivider";

export default function MessageList() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-6">
      <DateDivider date="Today" />

      <div className="flex flex-col gap-5">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}
      </div>
    </div>
  );
}
