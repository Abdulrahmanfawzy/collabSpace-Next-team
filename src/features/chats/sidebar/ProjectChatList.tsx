
"use client";

import type { ChatProject } from "@/features/chats/types/chat.types";
import ProjectChatItem from "./ProjectChatItem";

interface ProjectChatListProps {
  projects: ChatProject[];
  searchQuery?: string;
  onSelectProject: (project: ChatProject) => void;
}

export default function ProjectChatList({
  projects,
  searchQuery = "",
  onSelectProject,
}: ProjectChatListProps) {
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Recent
        </h3>
      </div>

      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <ProjectChatItem
            key={project.id}
            project={project}
            onSelectProject={onSelectProject}
          />
        ))
      ) : (
        <p className="px-4 py-6 text-center text-sm text-muted-foreground">
          No projects found.
        </p>
      )}
    </div>
  );
}
