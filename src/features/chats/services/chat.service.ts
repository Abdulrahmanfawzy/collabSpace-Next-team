
import  apiClient  from "@/api/apiClient";

import type {
  ChatMessage,
  ChatMessageResponse,
  ChatMessagesResponse,
} from "../types/chat.types";

export interface SendMessagePayload {
  message: string;
  parent_id?: number | null;
  file_attachment_id?: number | null;
  mentions?: number[];
}

export interface UpdateMessagePayload {
  message: string;
}

export const chatService = {
  getProjectMessages: async (
    projectId: number,
    perPage: number = 20
  ): Promise<ChatMessagesResponse> => {
    const { data } = await apiClient.get<ChatMessagesResponse>(
      `/v1/projects/${projectId}/messages`,
      {
        params: {
          per_page: perPage,
        },
      }
    );

    return data;
  },

  sendMessage: async (
    projectId: number,
    payload: SendMessagePayload
  ): Promise<ChatMessage> => {
    const { data } = await apiClient.post<ChatMessageResponse>(
      `/v1/projects/${projectId}/messages`,
      payload
    );

    return data.data;
  },

  updateMessage: async (
    messageId: number,
    payload: UpdateMessagePayload
  ): Promise<ChatMessage> => {
    const { data } = await apiClient.patch<ChatMessageResponse>(
      `/v1/messages/${messageId}`,
      payload
    );

    return data.data;
  },

  deleteMessage: async (messageId: number): Promise<void> => {
    await apiClient.delete(`/v1/messages/${messageId}`);
  },
};
