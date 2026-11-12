
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  useMeetingComments,
  useCreateMeetingComment,
  useUpdateMeetingComment,
  useDeleteMeetingComment,
} from "@/features/meetings/hooks/useMeetingComments";

type CommentsMeetingProps = {
  meetingId: number;
};

export default function CommentsMeeting({
  meetingId,
}: CommentsMeetingProps) {
  const [content, setContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const { data, isLoading, isError } = useMeetingComments(meetingId);

  const createMutation = useCreateMeetingComment();
  const updateMutation = useUpdateMeetingComment();
  const deleteMutation = useDeleteMeetingComment();

  const comments = data?.data?.data ?? [];

  const handleAddComment = async () => {
    const body = content.trim();

    if (!body) return;

    try {
      await createMutation.mutateAsync({
        meetingId,
        data: { body },
      });

      setContent("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const handleReply = async (parentId: number) => {
    const body = replyContent.trim();

    if (!body) return;

    try {
      await createMutation.mutateAsync({
        meetingId,
        data: {
          body,
          parent_id: parentId,
        },
      });

      setReplyContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Failed to reply:", error);
    }
  };

  const handleUpdate = async (commentId: number) => {
    const body = editContent.trim();

    if (!body) return;

    try {
      await updateMutation.mutateAsync({
        meetingId,
        commentId,
        data: { body },
      });

      setEditingComment(null);
      setEditContent("");
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDelete = async (commentId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync({
        meetingId,
        commentId,
      });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading comments...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        Failed to load comments.
      </p>
    );
  }

  return (
    <section className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">
          Meeting Comments
        </h2>

        <p className="text-sm text-muted-foreground">
          Discuss and share your thoughts about this meeting.
        </p>
      </div>

      {/* Add Comment */}
      <div className="space-y-3">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write a comment..."
          className="w-full min-h-24 rounded-lg border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        />

        <Button
          type="button"
          onClick={handleAddComment}
          disabled={!content.trim() || createMutation.isPending}
        >
          {createMutation.isPending ? "Posting..." : "Post Comment"}
        </Button>
      </div>

      {/* Comments List */}
     
    </section>
  );
}
