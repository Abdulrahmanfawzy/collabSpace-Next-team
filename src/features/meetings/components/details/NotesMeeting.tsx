
"use client";

import { useState } from "react";
import {
  useMeetingNotes,
  useCreateMeetingNote,
  useUpdateMeetingNote,
  useDeleteMeetingNote,
} from "@/features/meetings/hooks/useMeetingNotes";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import type { MeetingNote } from "@/features/meetings/types/note.types";

type NotesMeetingProps = {
  meetingId: number;
};

export default function NotesMeeting({
  meetingId,
}: NotesMeetingProps) {
  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(
    null
  );
  const [error, setError] = useState("");

  const { data, isLoading, isError } = useMeetingNotes(meetingId);

  const createMutation = useCreateMeetingNote();
  const updateMutation = useUpdateMeetingNote();
  const deleteMutation = useDeleteMeetingNote();

  // Adjust this according to the actual API response.
  const notes: MeetingNote[] = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.data)
      ? data.data.data
      : [];

  const isSubmitting =
    createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async () => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError("Please enter a note.");
      return;
    }

    setError("");

    try {
      if (editingNoteId !== null) {
        await updateMutation.mutateAsync({
          meetingId,
          noteId: editingNoteId,
          data: { content: trimmedContent },
        });
      } else {
        await createMutation.mutateAsync({
          meetingId,
          data: { content: trimmedContent },
        });
      }

      setContent("");
      setEditingNoteId(null);
    } catch {
      setError("Failed to save note. Please try again.");
    }
  };

  const handleEdit = (note: MeetingNote) => {
    setEditingNoteId(note.id);
    setContent(note.content);
    setError("");
  };

  const handleDelete = async (noteId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync({
        meetingId,
        noteId,
      });
    } catch {
      setError("Failed to delete note.");
    }
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading notes...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-support-red">
        Failed to load meeting notes.
      </p>
    );
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Meeting Notes</h2>
        <p className="text-sm text-muted-foreground">
          Write and manage your meeting notes.
        </p>
      </div>

      {/* Add / Edit Note */}
      <div className="space-y-3">
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your meeting note..."
          rows={4}
        />

        {error && (
          <p role="alert" className="text-sm text-support-red">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          {editingNoteId !== null && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditingNoteId(null);
                setContent("");
                setError("");
              }}
            >
              Cancel
            </Button>
          )}

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting
              ? "Saving..."
              : editingNoteId !== null
                ? "Update Note"
                : "Add Note"}
          </Button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No notes available yet.
          </p>
        ) : (
          notes.map((note) => (
            <article
              key={note.id}
              className="rounded-lg border border-border p-4 space-y-3"
            >
              <p className="whitespace-pre-wrap text-sm">
                {note.content}
              </p>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(note)}
                  disabled={deleteMutation.isPending || isSubmitting}
                >
                  Edit
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(note.id)}
                  disabled={deleteMutation.isPending || isSubmitting}
                >
                  {deleteMutation.isPending
                    ? "Deleting..."
                    : "Delete"}
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
