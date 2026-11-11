
import { MessageSquareText } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <MessageSquareText
          size={32}
          className="text-muted-foreground"
        />
      </div>

      <div className="max-w-sm space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Your conversations start here
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          Select a conversation or project channel from the sidebar
          to start chatting with your team.
        </p>
      </div>
    </div>
  );
}
