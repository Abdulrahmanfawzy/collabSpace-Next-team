"use client"

// components/meetings-and-ask-ai.tsx
import * as React from "react"
import Link from "next/link"
import { Bot, CalendarDays, Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

/* ======================================================================
   Upcoming Meetings
   ====================================================================== */

export type Attendee = {
  name: string
  avatarUrl?: string
}

export type Meeting = {
  id: string
  title: string
  date: string // e.g. "Today", "Dec 12"
  time: string // e.g. "14:00 - 15:00"
  attendees: Attendee[]
}

const MAX_AVATARS = 3

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase()
}

function MeetingItem({ meeting }: { meeting: Meeting }) {
  const shown = meeting.attendees.slice(0, MAX_AVATARS)
  const extra = meeting.attendees.length - shown.length

  return (
    <li className="rounded-xl border border-border/60 p-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium">{meeting.title}</h3>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {meeting.date}
          <CalendarDays className="size-3.5" aria-hidden />
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div
          className="flex -space-x-2"
          role="group"
          aria-label={`${meeting.attendees.length} attendees`}
        >
          {shown.map((a) => (
            <Avatar key={a.name} className="size-8 ring-2 ring-card">
              <AvatarImage src={a.avatarUrl} alt={a.name} />
              <AvatarFallback className="text-[10px]">{initials(a.name)}</AvatarFallback>
            </Avatar>
          ))}
          {extra > 0 && (
            <span className="relative grid size-8 place-items-center rounded-full bg-muted text-xs text-muted-foreground ring-2 ring-card">
              +{extra}
            </span>
          )}
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">{meeting.time}</span>
      </div>
    </li>
  )
}

export type UpcomingMeetingsProps = {
  meetings: Meeting[]
  viewAllHref?: string
}

export function UpcomingMeetings({
  meetings,
  viewAllHref = "/meetings",
}: UpcomingMeetingsProps) {
  return (
    <Card className="rounded-2xl h-105 w-80 border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 pb-3">
        <CardTitle className="text-xl font-medium">Up coming meetings</CardTitle>
        <Link href={viewAllHref} className="text-xs text-blue-600 hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <ul className="space-y-3">
          {meetings.map((m) => (
            <MeetingItem key={m.id} meeting={m} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

/* ======================================================================
   Ask AI
   ====================================================================== */

export type AskAIProps = {
  onSend: (message: string) => void | Promise<void>
  heading?: string
  placeholder?: string
  className?: string
}

export function AskAI({
  onSend,
  heading = "ask me anything about...",
  placeholder = "ask me anything about...",
  className,
}: AskAIProps) {
  const [message, setMessage] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const canSend = message.trim().length > 0 && !pending

  async function submit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!canSend) return
    setPending(true)
    try {
      await onSend(message.trim())
      setMessage("")
    } finally {
      setPending(false)
    }
  }

  return (
    <Card
      className={cn(
        "flex flex-col rounded-2xl w-80 h-105 border-0 bg-gradient-to-b from-blue-50/70 via-card to-card shadow-sm",
        className
      )}
    >
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-xl font-medium">Ask AI</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8">
          <Bot className="size-10 text-blue-500" strokeWidth={1.5} aria-hidden />
          <p className="text-sm">{heading}</p>
        </div>

        <form
          onSubmit={submit}
          className="relative rounded-2xl bg-muted/60 p-3 focus-within:ring-2 focus-within:ring-blue-500/30"
        >
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                void submit()
              }
            }}
            placeholder={placeholder}
            aria-label="Ask AI"
            rows={3}
            className="min-h-[72px] resize-none border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              disabled={!canSend}
              aria-label="Send"
              className="size-8"
            >
              <Send className="size-5" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

/* ======================================================================
   Both side by side
   ====================================================================== */

export type MeetingsAndAskAIProps = {
  meetings: Meeting[]
  onSend: AskAIProps["onSend"]
  meetingsHref?: string
}

export function MeetingsAndAskAI({ meetings, meetingsHref }: MeetingsAndAskAIProps) {
    const  onSend=(message)=>{
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
