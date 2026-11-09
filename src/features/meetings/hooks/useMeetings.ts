
import { useQuery } from "@tanstack/react-query";
import { meetingService } from "../services/meeting.service";

export const useMeetings = () => {
  return useQuery({
    queryKey: ["meetings", 1, "upcoming"],
    queryFn: () =>
      meetingService.getMeetings({
        project_id: 1,
        time_filter: "upcoming",
        per_page: 15,
      }),
    select: (response) => response.data.data,
  });
};
