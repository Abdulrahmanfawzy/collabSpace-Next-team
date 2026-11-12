
import {
  format,
  formatDistanceToNow,
  isValid,
  parseISO,
} from "date-fns";

export function formatRelativeDate(date: string): string {
  const parsedDate = parseISO(date);

  if (!isValid(parsedDate)) return "";

  return formatDistanceToNow(parsedDate, {
    addSuffix: true,
  });
}

export function formatDate(date: string): string {
  const parsedDate = parseISO(date);

  if (!isValid(parsedDate)) return "";

  return format(parsedDate, "MMM dd, yyyy");
}

export function formatTime(date: string): string {
  const parsedDate = parseISO(date);

  if (!isValid(parsedDate)) return "";

  return format(parsedDate, "HH:mm");
}
