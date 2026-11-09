
import apiClient from "@/api/apiClient";
import type {
  MeetingsResponse,
} from "../types/meeting.types";

interface GetMeetingsParams {
  project_id?: number;
  time_filter?: "upcoming" | "past" | "all";
  per_page?: number;
}

export const meetingService = {
  getMeetings: async (
    params: GetMeetingsParams = {}
  ): Promise<MeetingsResponse> => {
    const response = await apiClient.get<MeetingsResponse>(
      "/meetings",
      {
        params: {
          project_id: 1,
          time_filter: "upcoming",
          per_page: 15,
          ...params,
        },
      }
    );

    return response.data;
  },
};
