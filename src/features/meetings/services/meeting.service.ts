
import apiClient from "@/api/apiClient";
import type {
  CreateMeetingValues,
  MeetingsResponse,
  Meeting,
} from "../types/meeting.types";

export interface GetMeetingsParams {
  project_id?: number;
  time_filter?: "upcoming" | "past" | "all";
  per_page?: number;
}

export type UpdateMeetingValues = Partial<
  Pick<
    CreateMeetingValues,
    | "title"
    | "description"
    | "meeting_date"
    | "start_time"
    | "end_time"
    | "meeting_link"
  >
>;

const DEFAULT_MEETINGS_PARAMS: GetMeetingsParams = {
  project_id: 1,
  time_filter: "upcoming",
  per_page: 15,
};

export const meetingService = {
  // Get all meetings
  getMeetings: async (
    params: GetMeetingsParams = {},
  ): Promise<MeetingsResponse> => {
    const response = await apiClient.get<MeetingsResponse>(
      "/meetings",
      {
        params: {
          ...DEFAULT_MEETINGS_PARAMS,
          ...params,
        },
      },
    );

    return response.data;
  },

  // Get meeting details by ID
  getMeetingById: async (id: number): Promise<Meeting> => {
    const response = await apiClient.get<{ data: Meeting }>(
      `/meetings/${id}`,
    );

    return response.data.data;
  },

  // Create meeting
  createMeeting: async (data: CreateMeetingValues) => {
    const response = await apiClient.post("/meetings", data);

    return response.data;
  },

  // Update meeting
  updateMeeting: async (
    id: number,
    data: UpdateMeetingValues,
  ) => {
    const response = await apiClient.put(
      `/meetings/${id}`,
      data,
    );

    return response.data;
  },
};
