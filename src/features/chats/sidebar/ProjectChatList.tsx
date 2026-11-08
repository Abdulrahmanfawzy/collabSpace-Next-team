"use client";

import { useState } from "react";
import type {
  ChatProject,
  ChatChannel,
} from "@/features/chats/types/chat.types";

import ProjectChatItem from "./ProjectChatItem";

interface ProjectChatListProps {
  projects: ChatProject[];
  searchQuery?: string;
  onSelectChannel?: (
    channel: ChatChannel,
    project: ChatProject
  ) => void;
}

export default function ProjectChatList({
  projects,
  searchQuery = "",
  onSelectChannel,
}: ProjectChatListProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);

      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }

      return next;
    });
  };

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
            isExpanded={expandedProjects.has(project.id)}
            onToggle={() => toggleProject(project.id)}
            onSelectChannel={onSelectChannel}
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