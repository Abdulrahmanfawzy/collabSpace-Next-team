
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meetingService } from "../services/meeting.service";
import type { CreateMeetingValues } from "../components/calendar/AddMeetingDialog";

export const useCreateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: CreateMeetingValues) =>
      meetingService.createMeeting(values),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["meetings"],
      });
    },
  });
};
