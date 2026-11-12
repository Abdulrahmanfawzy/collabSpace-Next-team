
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meetingService } from "../services/meeting.service";
import type { UpdateMeetingValues } from "../services/meeting.service";

type UpdateMeetingPayload = {
  id: number;
  values: UpdateMeetingValues;
};

export const useUpdateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: UpdateMeetingPayload) =>
      meetingService.updateMeeting(id, values),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["meetings"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["meeting", variables.id],
        }),
      ]);
    },
  });
};
