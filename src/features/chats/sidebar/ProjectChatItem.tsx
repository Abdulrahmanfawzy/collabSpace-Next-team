
import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import type { ChatProject } from "@/features/chats/types/chat.types";
import ProjectAccordion from "@/features/chats/sidebar/ProjectAccordion";

interface ProjectChatItemProps {
  project: ChatProject;
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
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
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
            {project.channels.length} channels
          </p>
        </div>

        {isExpanded ? (
          <ChevronDown
            size={16}
            className="shrink-0 text-muted-foreground"
          />
        ) : (
          <ChevronRight
            size={16}
            className="shrink-0 text-muted-foreground"
          />
        )}
      </button>

      <ProjectAccordion
        project={project}
        isExpanded={isExpanded}
      />
    </div>
  );
}
