
"use client";

import { useEffect, useState } from "react";
import { formatRelativeDate } from "@/utils/date";

interface RelativeTimeProps {
  date: string;
}

export function RelativeTime({ date }: RelativeTimeProps) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((previous) => previous + 1);
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <time dateTime={date}>
      {formatRelativeDate(date)}
    </time>
  );
}
