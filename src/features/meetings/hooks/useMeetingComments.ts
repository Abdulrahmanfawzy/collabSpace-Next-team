
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { commentService } from "../services/comment.service";

import type {
  CreateMeetingCommentValues,
  UpdateMeetingCommentValues,
} from "../types/comment.types";

// Query Key
export const meetingCommentsKey = (meetingId: number) => [
  "meeting-comments",
  meetingId,
];

// GET: Fetch Comments
export const useMeetingComments = (meetingId: number) => {
  return useQuery({
    queryKey: meetingCommentsKey(meetingId),
    queryFn: () => commentService.getComments(meetingId),
    enabled: Number.isInteger(meetingId) && meetingId > 0,
  });
};

// POST: Create Comment or Reply
export const useCreateMeetingComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      meetingId,
      data,
    }: {
      meetingId: number;
      data: CreateMeetingCommentValues;
    }) => commentService.createComment(meetingId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: meetingCommentsKey(variables.meetingId),
      });
    },
  });
};

// PUT: Update Comment
export const useUpdateMeetingComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      meetingId,
      commentId,
      data,
    }: {
      meetingId: number;
      commentId: number;
      data: UpdateMeetingCommentValues;
    }) =>
      commentService.updateComment(
        meetingId,
        commentId,
        data
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: meetingCommentsKey(variables.meetingId),
      });
    },
  });
};

// DELETE: Delete Comment
export const useDeleteMeetingComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      meetingId,
      commentId,
    }: {
      meetingId: number;
      commentId: number;
    }) =>
      commentService.deleteComment(
        meetingId,
        commentId
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: meetingCommentsKey(variables.meetingId),
      });
    },
  });
};
