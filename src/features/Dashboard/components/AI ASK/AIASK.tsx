"use client";

import * as React from "react";
import { Bot, Send, Loader2, Sparkles, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { AskAIProps } from "../../types/typesDashboard";

export function AskAI({
  onSend,
  heading = "ask me anything about...",
  placeholder = "ask me anything about...",
  className,
}: AskAIProps) {
  const [message, setMessage] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [conversation, setConversation] = React.useState<{
    question: string;
    answer?: string;
    error?: string;
  } | null>(null);

  const canSend = message.trim().length > 0 && !pending;

  async function handleSubmit(e?: React.FormEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const query = message.trim();
    if (!query || pending) return;

    setPending(true);
    setConversation({ question: query });
    setMessage("");

    try {
      const res = await onSend?.(query);
      const answer =
        (res as { answer?: string } | undefined)?.answer ||
        "I have processed your request.";
      setConversation({ question: query, answer });
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to get AI answer. Please try again.";
      setConversation({ question: query, error: errorMsg });
    } finally {
      setPending(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card
      className={cn(
        "flex flex-col rounded-2xl w-80 h-105 border-0 bg-linear-to-b from-blue-50/70 via-card to-card shadow-sm",
        className
      )}
    >
      <CardHeader className="p-5 pb-0 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-medium">Ask AI</CardTitle>
        {conversation && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setConversation(null)}
            className="h-7 px-2 text-xs text-neutral-500 hover:text-neutral-900"
          >
            <RotateCcw className="mr-1 size-3" />
            Reset
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-5 overflow-hidden">
        {/* Visual Content / Chat area */}
        <div className="flex flex-1 flex-col justify-center overflow-y-auto py-2">
          {pending ? (
            <div className="flex flex-col items-center justify-center gap-3 py-6 text-center text-sm text-neutral-500">
              <Loader2 className="size-8 animate-spin text-blue-500" />
              <p className="text-xs">AI is thinking...</p>
            </div>
          ) : conversation ? (
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="rounded-xl bg-blue-50/80 p-2.5 text-blue-900">
                <span className="font-semibold block text-[10px] text-blue-500 uppercase tracking-wide">
                  You asked:
                </span>
                <p className="mt-0.5 line-clamp-3">{conversation.question}</p>
              </div>
              {conversation.answer && (
                <div className="rounded-xl bg-white p-2.5 text-neutral-800 shadow-2xs border border-neutral-100 max-h-36 overflow-y-auto">
                  <div className="flex items-center gap-1 font-semibold text-[10px] text-purple-600 uppercase tracking-wide mb-1">
                    <Sparkles className="size-3" />
                    Answer
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {conversation.answer}
                  </p>
                </div>
              )}
              {conversation.error && (
                <div className="rounded-xl bg-red-50 p-2 text-red-600 text-xs">
                  {conversation.error}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
              <Bot className="size-10 text-blue-500" strokeWidth={1.5} aria-hidden />
              <p className="text-sm text-neutral-600">{heading}</p>
            </div>
          )}
        </div>

        {/* Input Form with preventDefault */}
        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl bg-muted/60 p-3 focus-within:ring-2 focus-within:ring-blue-500/30"
        >
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Ask AI"
            rows={2}
            disabled={pending}
            className="min-h-14 resize-none border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              disabled={!canSend}
              aria-label="Send"
              className="size-8 text-neutral-600 hover:text-blue-600"
            >
              {pending ? (
                <Loader2 className="size-4 animate-spin text-blue-500" />
              ) : (
                <Send className="size-4" />
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
export default AskAI;
