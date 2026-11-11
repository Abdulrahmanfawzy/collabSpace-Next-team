
"use client";

import { useState } from "react";
import {
  MessageSquare,
  Pencil,
  Trash2,
  Send,
  X,
  CornerDownRight,
} from "lucide-react";

import {
  useMeetingComments,
  useCreateMeetingComment,
  useUpdateMeetingComment,
  useDeleteMeetingComment,
} from "@/features/meetings/hooks/useMeetingComments";

import type {
  MeetingComment,
} from "@/features/meetings/types/comment.types";

type Props = {
  meetingId: number;
};

export default function MeetingTranscripts({ meetingId }: Props) {
  const { data, isLoading, isError } = useMeetingComments(meetingId);

  const createMutation = useCreateMeetingComment();
  const updateMutation = useUpdateMeetingComment();
  const deleteMutation = useDeleteMeetingComment();

  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyBody, setReplyBody] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editBody, setEditBody] = useState("");

  const comments: MeetingComment[] = data?.data?.data ?? [];

  const handleReply = (commentId: number) => {
    if (!replyBody.trim()) return;

    createMutation.mutate(
      {
        meetingId,
        data: {
          body: replyBody.trim(),
          parent_id: commentId,
        },
      },
      {
        onSuccess: () => {
          setReplyBody("");
          setReplyingTo(null);
        },
      }
    );
  };

  const handleEdit = (commentId: number) => {
    if (!editBody.trim()) return;

    updateMutation.mutate(
      {
        meetingId,
        commentId,
        data: {
          body: editBody.trim(),
        },
      },
      {
        onSuccess: () => {
          setEditingId(null);
          setEditBody("");
        },
      }
    );
  };

  const handleDelete = (commentId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) return;

    deleteMutation.mutate({
      meetingId,
      commentId,
    });
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

  if (!comments.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No comments yet.
      </p>
    );
  }

  const renderComment = (
    comment: MeetingComment,
    isReply = false
  ) => (
    <article
      key={comment.id}
      className={`space-y-3 ${isReply ? "border-l-2 border-border pl-4" : ""}`}
    >
      <div className="flex items-start gap-3">
        {comment.author.avatar_url ? (
          <img
            src={comment.author.avatar_url}
            alt={comment.author.name}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted font-semibold">
            {comment.author.name.charAt(0)}
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-semibold">
            {comment.author.name}
          </p>

          <p className="text-xs text-muted-foreground">
            {comment.author.job_title}
          </p>

          <p className="text-xs text-muted-foreground">
            {new Date(comment.created_at).toLocaleDateString("en-US")}
            {comment.is_edited && " · Edited"}
          </p>

          {editingId === comment.id ? (
            <div className="space-y-2 pt-2">
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="w-full rounded-md border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                rows={3}
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(comment.id)}
                  disabled={
                    updateMutation.isPending || !editBody.trim()
                  }
                  className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setEditBody("");
                  }}
                  className="rounded-md border px-3 py-1.5 text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-sm leading-6">
              {comment.body}
            </p>
          )}

          {/* Actions */}
          {editingId !== comment.id && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {!isReply && (
                <button
                  type="button"
                  onClick={() => {
                    setReplyingTo(
                      replyingTo === comment.id ? null : comment.id
                    );
                    setReplyBody("");
                    setEditingId(null);
                  }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                >
                  <MessageSquare size={14} />
                  Reply
                </button>
              )}

              {comment.can_edit && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditBody(comment.body);
                    setReplyingTo(null);
                  }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                >
                  <Pencil size={14} />
                  Edit
                </button>
              )}

              {comment.can_delete && (
                <button
                  type="button"
                  onClick={() => handleDelete(comment.id)}
                  disabled={deleteMutation.isPending}
                  className="flex items-center gap-1 text-xs text-destructive hover:opacity-70 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              )}
            </div>
          )}

          {/* Reply Form */}
          {replyingTo === comment.id && !isReply && (
            <div className="space-y-2 pt-3">
              <textarea
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                placeholder={`Reply to ${comment.author.name}...`}
                rows={2}
                className="w-full rounded-md border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleReply(comment.id)}
                  disabled={
                    createMutation.isPending || !replyBody.trim()
                  }
                  className="flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground disabled:opacity-50"
                >
                  <Send size={13} />
                  {createMutation.isPending ? "Sending..." : "Send Reply"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyBody("");
                  }}
                  className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs"
                >
                  <X size={13} />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies?.length > 0 && (
        <div className="ml-6 space-y-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex gap-2">
              <CornerDownRight
                size={16}
                className="mt-2 shrink-0 text-muted-foreground"
              />
              <div className="min-w-0 flex-1">
                {renderComment(reply, true)}
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );

  return (
    <section className="max-h-[500px] space-y-6 overflow-y-auto pr-3">
      {comments.map((comment) => renderComment(comment))}
    </section>
  );
}
