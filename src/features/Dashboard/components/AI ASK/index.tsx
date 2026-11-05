"use client"
import { MeetingsAndAskAIProps } from "../../types/typesDashboard"
import { AskAI } from "./AIASK"
import UpcomingMeetings from "./UpComingMeet"

function MeetingsAndAskAI({ meetings, meetingsHref }: MeetingsAndAskAIProps) {
  const onSend = (message: any) => {
    // call your AI endpoint here
    console.log(message)
  }
  return (
    <div className="contents ">
      <UpcomingMeetings meetings={meetings} viewAllHref={meetingsHref} />
      <AskAI onSend={onSend} />
    </div>
  )
}

export default MeetingsAndAskAI