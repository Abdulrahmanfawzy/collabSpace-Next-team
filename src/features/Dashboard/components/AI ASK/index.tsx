"use client";

import type { MeetingsAndAskAIProps } from "../../types/typesDashboard";
import { AskAI } from "./AIASK";
import UpcomingMeetings from "./UpComingMeet";
import { askAIAction } from "@/actions/ai.actions";

function MeetingsAndAskAI({ meetings, meetingsHref }: MeetingsAndAskAIProps) {
  const handleSend = async (message: string) => {
    return await askAIAction(message);
  };

  return (
    <div className="contents">
      <UpcomingMeetings meetings={meetings} viewAllHref={meetingsHref} />
      <AskAI onSend={handleSend} />
    </div>
  );
}

export default MeetingsAndAskAI;
