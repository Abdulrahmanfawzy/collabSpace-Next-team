
import apiClient from "@/api/apiClient";
import type { MeetingsResponse } from "../types/meeting.types";

export interface GetMeetingsParams {
  project_id?: number;
  time_filter?: "upcoming" | "past" | "all";
  per_page?: number;
}

const DEFAULT_MEETINGS_PARAMS: GetMeetingsParams = {
  project_id: 1,
  time_filter: "upcoming",
  per_page: 15,
};

export const meetingService = {
  getMeetings: async (
    params: GetMeetingsParams = {}
  ): Promise<MeetingsResponse> => {
    const response = await apiClient.get<MeetingsResponse>(
      "/meetings",
      {
        params: {
          ...DEFAULT_MEETINGS_PARAMS,
          ...params,
        },
      }
    );

    return response.data;
  },
};
