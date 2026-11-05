"use client"

import * as React from "react"
import { Bot, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { AskAIProps } from "../../types/typesDashboard"

/* ======================================================================
   Upcoming Meetings
   ====================================================================== */



export function AskAI({
  onSend,
  heading = "ask me anything about...",
  placeholder = "ask me anything about...",
  className,
}: AskAIProps) {
  const [message, setMessage] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const canSend = message.trim().length > 0 && !pending
  // this fn Api Call I'm Ready 😊
  // async function submit(e?: React.FormEvent) {
  //   e?.preventDefault()
  //   if (!canSend) return
  //   setPending(true)
  //   try {
  //     await onSend(message.trim())
  //     setMessage("")
  //   } finally {
  //     setPending(false)
  //   }
  // }

  return (
    <Card
      className={cn(
        "flex flex-col rounded-2xl w-80 h-105 border-0 bg-linear-to-b from-blue-50/70 via-card to-card shadow-sm",
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
          className="relative rounded-2xl bg-muted/60 p-3 focus-within:ring-2 focus-within:ring-blue-500/30"
        >
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}

            placeholder={placeholder}
            aria-label="Ask AI"
            rows={3}
            className="min-h-18 resize-none border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0"
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

