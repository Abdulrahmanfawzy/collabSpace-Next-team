import apiClient from "@/api/apiClient";
import type {
  MeetingNote,
  CreateMeetingNoteValues,
} from "../types/note.types";

export const noteService = {
  getNotes: async (meetingId: number) => {
    const response = await apiClient.get(
      `/meetings/${meetingId}/notes`
    );

    return response.data;
  },

  createNote: async (
    meetingId: number,
    data: CreateMeetingNoteValues
  ) => {
    const response = await apiClient.post(
      `/meetings/${meetingId}/notes`,
      data
    );

    return response.data;
  },

  updateNote: async (
    meetingId: number,
    noteId: number,
    data: CreateMeetingNoteValues
  ) => {
    const response = await apiClient.put(
      `/meetings/${meetingId}/notes/${noteId}`,
      data
    );

    return response.data;
  },

  deleteNote: async (meetingId: number, noteId: number) => {
    const response = await apiClient.delete(
      `/meetings/${meetingId}/notes/${noteId}`
    );

    return response.data;
  },
};