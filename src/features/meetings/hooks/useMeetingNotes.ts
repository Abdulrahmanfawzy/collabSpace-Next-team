
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { noteService } from "../services/note.service";

import type {
  CreateMeetingNoteValues,
} from "../types/note.types";

// Query Key
export const meetingNotesKey = (meetingId: number) => [
  "meeting-notes",
  meetingId,
];

// GET: Fetch Notes
export const useMeetingNotes = (meetingId: number) => {
  return useQuery({
    queryKey: meetingNotesKey(meetingId),
    queryFn: () => noteService.getNotes(meetingId),
    enabled: Number.isInteger(meetingId) && meetingId > 0,
  });
};

// POST: Create Note
export const useCreateMeetingNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      meetingId,
      data,
    }: {
      meetingId: number;
      data: CreateMeetingNoteValues;
    }) => noteService.createNote(meetingId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: meetingNotesKey(variables.meetingId),
      });
    },
  });
};

// PUT: Update Note
export const useUpdateMeetingNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      meetingId,
      noteId,
      data,
    }: {
      meetingId: number;
      noteId: number;
      data: CreateMeetingNoteValues;
    }) =>
      noteService.updateNote(meetingId, noteId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: meetingNotesKey(variables.meetingId),
      });
    },
  });
};

// DELETE: Delete Note
export const useDeleteMeetingNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      meetingId,
      noteId,
    }: {
      meetingId: number;
      noteId: number;
    }) => noteService.deleteNote(meetingId, noteId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: meetingNotesKey(variables.meetingId),
      });
    },
  });
};
