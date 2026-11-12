
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { chatService } from "../services/chat.service";
import type { SendMessagePayload } from "../services/chat.service";
import { chatKeys } from "./useProjectMessages";

export const useSendMessage = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendMessagePayload) =>
      chatService.sendMessage(projectId, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: chatKeys.messages(projectId),
      });
    },
  });
};
