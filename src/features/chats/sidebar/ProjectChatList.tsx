
import type { ComponentProps } from "react";
import ProjectChatItem from "@/features/chats/sidebar/ProjectChatItem";

type ProjectChat = ComponentProps<typeof ProjectChatItem>["project"] & {
  id?: string | number;
};

interface ProjectChatListProps {
  projects: ProjectChat[];
  searchQuery?: string;
}

export default function ProjectChatList({
  projects,
  searchQuery = "",
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
