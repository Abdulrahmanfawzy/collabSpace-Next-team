
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { chatService } from "../services/chat.service";
import { chatKeys } from "./useProjectMessages";

interface DeleteMessageVariables {
  messageId: number;
  projectId: number;
}

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId }: DeleteMessageVariables) =>
      chatService.deleteMessage(messageId),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: chatKeys.messages(variables.projectId),
      });
    },
  });
};
