
"use client";

import {
  useState,
} from "react";

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

  const {
    data,
    isLoading,
    isError,
  } = useMeetingComments(meetingId);

  const createMutation = useCreateMeetingComment();
  const updateMutation = useUpdateMeetingComment();
  const deleteMutation = useDeleteMeetingComment();

  const handleAddComment = async () => {
    const trimmedContent = content.trim();

    if (!trimmedContent) return;

    await createMutation.mutateAsync({
      meetingId,
      data: {
        body: trimmedContent,
      },
    });

    setContent("");
  };

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (isError) {
    return <p>Failed to load comments.</p>;
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">
          Meeting Comments
        </h2>

        <p className="text-sm text-muted-foreground">
          Discuss and share your thoughts about this meeting.
        </p>
      </div>

      <div className="space-y-3">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write a comment..."
          className="w-full min-h-24 rounded-lg border border-border p-3"
        />

        <button
          type="button"
          onClick={handleAddComment}
          disabled={!content.trim() || createMutation.isPending}
          className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          {createMutation.isPending
            ? "Posting..."
            : "Post Comment"}
        </button>
      </div>

      <div>
        {/* Comments list will be implemented
            after confirming the API response. */}
        <p className="text-sm text-muted-foreground">
          Comments will appear here.
        </p>
      </div>
    </section>
  );
}
