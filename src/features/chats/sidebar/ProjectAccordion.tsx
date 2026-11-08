import type {
  ChatProject,
  ChatChannel,
} from "../types/chat.types";

import ChannelItem from "@/features/chats/sidebar/ChannalItem";

interface ProjectAccordionProps {
  project: ChatProject;
  isExpanded: boolean;
  onSelectChannel?: (
    channel: ChatChannel,
    project: ChatProject
  ) => void;
}

export default function ProjectAccordion({
  project,
  isExpanded,
  onSelectChannel,
}: ProjectAccordionProps) {
  if (!isExpanded) return null;

  return (
    <div className="ml-7 flex flex-col border-l border-border">
      {project.channels.map((channel) => (
        <ChannelItem
          key={channel.id}
          channel={channel}
          onSelect={() => onSelectChannel?.(channel, project)}
        />
      ))}
    </div>
  );
}