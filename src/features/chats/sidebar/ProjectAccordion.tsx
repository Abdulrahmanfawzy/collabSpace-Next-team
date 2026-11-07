
import type { ChatProject } from "../types/chat.types";
import ChannelItem from "@/features/chats/sidebar/ChannalItem";

interface ProjectAccordionProps {
  project: ChatProject;
  isExpanded: boolean;
}

export default function ProjectAccordion({
  project,
  isExpanded,
}: ProjectAccordionProps) {
  if (!isExpanded) return null;

  return (
    <div className="ml-7 flex flex-col border-l border-border">
      {project.channels.map((channel) => (
        <ChannelItem
          key={channel.id}
          channel={channel}
        />
      ))}
    </div>
  );
}
