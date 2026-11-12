
import apiClient from "@/api/apiClient";

import type {
  MeetingComment,
  CreateMeetingCommentValues,
  UpdateMeetingCommentValues,
} from "../types/comment.types";

export const commentService = {
  // GET: Fetch meeting comments
  getComments: async (meetingId: number) => {
    const response = await apiClient.get(
      `/meetings/${meetingId}/comments`
    );

    return response.data;
  },

  // POST: Create comment or reply
  createComment: async (
    meetingId: number,
    data: CreateMeetingCommentValues
  ) => {
    const response = await apiClient.post(
      `/meetings/${meetingId}/comments`,
      data
    );

    return response.data;
  },

  // PUT: Update comment
  updateComment: async (
    meetingId: number,
    commentId: number,
    data: UpdateMeetingCommentValues
  ) => {
    const response = await apiClient.put(
      `/meetings/${meetingId}/comments/${commentId}`,
      data
    );

    return response.data;
  },

  // DELETE: Delete comment
  deleteComment: async (
    meetingId: number,
    commentId: number
  ) => {
    const response = await apiClient.delete(
      `/meetings/${meetingId}/comments/${commentId}`
    );

    return response.data;
  },
};
