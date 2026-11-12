
import { useQuery } from "@tanstack/react-query";
import { chatService } from "../services/chat.service";

export const chatKeys = {
  all: ["chat"] as const,
  messages: (projectId: number) =>
    [...chatKeys.all, "messages", projectId] as const,
};

export const useProjectMessages = (
  projectId: number,
  perPage: number = 20
) => {
  return useQuery({
    queryKey: [...chatKeys.messages(projectId), perPage],

    queryFn: () =>
      chatService.getProjectMessages(projectId, perPage),

    enabled: projectId > 0,

    staleTime: 30 * 1000,

    retry: 1,
  });
};
