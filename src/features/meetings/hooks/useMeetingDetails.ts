
import { useQuery } from "@tanstack/react-query";
import { meetingService } from "../services/meeting.service";

export const useMeetingDetails = (id: number) => {
  return useQuery({
    queryKey: ["meetings", "details", id],
    queryFn: () => meetingService.getMeetingById(id),
    enabled: Number.isInteger(id) && id > 0,
  });
};
