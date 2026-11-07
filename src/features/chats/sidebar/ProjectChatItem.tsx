
import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProjectChat = {
  name: string;
  description?: string;
  time: string;
};

interface ProjectChatItemProps {
  project: ProjectChat;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function ProjectChatItem({
  project,
  isExpanded = false,
  onToggle,
}: ProjectChatItemProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 transition-colors hover:bg-muted">
        <Folder
          size={20}
          className="shrink-0 text-muted-foreground"
        />

        <button
          type="button"
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-center justify-between gap-2 text-left"
        >
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-semibold text-foreground">
              {project.name}
            </h4>

            {project.description && (
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {project.description}
              </p>
            )}
          </div>

          <span className="shrink-0 text-xs text-muted-foreground">
            {project.time}
          </span>
        </button>

        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={isExpanded ? "Collapse project" : "Expand project"}
          onClick={onToggle}
        >
          {isExpanded ? (
            <ChevronDown />
          ) : (
            <ChevronRight />
          )}
        </Button>
      </div>
    </div>
  );
}
