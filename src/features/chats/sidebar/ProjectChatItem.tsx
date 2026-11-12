
import { Folder } from "lucide-react";

import type { ChatProject } from "@/features/chats/types/chat.types";
import { Button } from "@/components/ui/button";

interface ProjectChatItemProps {
  project: ChatProject;
  onSelectProject: (project: ChatProject) => void;
}

export default function ProjectChatItem({
  project,
  onSelectProject,
}: ProjectChatItemProps) {
  return (
    <div className="flex flex-col">
      <Button
        type="button"
        variant="ghost"
        onClick={() => onSelectProject(project)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted"
      >
        <Folder
          size={20}
          className="shrink-0 text-muted-foreground"
        />

        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-semibold text-foreground">
            {project.name}
          </h4>

          <p className="mt-1 text-xs text-muted-foreground">
            Project discussion
          </p>
        </div>
      </Button>
    </div>
  );
}
