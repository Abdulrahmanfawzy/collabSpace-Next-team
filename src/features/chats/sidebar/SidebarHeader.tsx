
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SidebarHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <h2 className="text-xl font-semibold text-foreground">
        Chats
      </h2>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Search chats"
        >
          <Search />
        </Button>
      </div>
    </div>
  );
}
