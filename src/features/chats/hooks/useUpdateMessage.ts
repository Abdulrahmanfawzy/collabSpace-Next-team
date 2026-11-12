
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { chatService } from "../services/chat.service";
import type { UpdateMessagePayload } from "../services/chat.service";
import { chatKeys } from "./useProjectMessages";

interface UpdateMessageVariables {
  messageId: number;
  payload: UpdateMessagePayload;
  projectId: number;
}

export const useUpdateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      messageId,
      payload,
    }: UpdateMessageVariables) =>
      chatService.updateMessage(messageId, payload),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: chatKeys.messages(variables.projectId),
      });
    },
  });
};
