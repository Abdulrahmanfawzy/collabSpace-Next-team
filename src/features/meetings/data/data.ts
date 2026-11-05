
export type CalendarDay = {
  name: string;
  date: number;
  fullDate: string;
  isCurrentMonth: boolean;
};

export type CalendarMonth = {
  month: number;
  year: number;
};

export type Meeting = {
  id: number;
  title: string;
  day: string;
  date: number;
  month: number;
  year: string;
  fullDate: string;
  startTime: string;
  endTime: string;
  color: string;
  project: {
    name: string;
  };
};

export const calendarDate: CalendarMonth = {
  month: 10, // November (0-indexed)
  year: 2026,
};

export const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const month: CalendarDay[][] = [
  [
    { name: "Sun", date: 25, fullDate: "2026-10-25", isCurrentMonth: false },
    { name: "Mon", date: 26, fullDate: "2026-10-26", isCurrentMonth: false },
    { name: "Tue", date: 27, fullDate: "2026-10-27", isCurrentMonth: false },
    { name: "Wed", date: 28, fullDate: "2026-10-28", isCurrentMonth: false },
    { name: "Thu", date: 29, fullDate: "2026-10-29", isCurrentMonth: false },
    { name: "Fri", date: 30, fullDate: "2026-10-30", isCurrentMonth: false },
    { name: "Sat", date: 31, fullDate: "2026-10-31", isCurrentMonth: false },
  ],
  [
    { name: "Sun", date: 1, fullDate: "2026-11-01", isCurrentMonth: true },
    { name: "Mon", date: 2, fullDate: "2026-11-02", isCurrentMonth: true },
    { name: "Tue", date: 3, fullDate: "2026-11-03", isCurrentMonth: true },
    { name: "Wed", date: 4, fullDate: "2026-11-04", isCurrentMonth: true },
    { name: "Thu", date: 5, fullDate: "2026-11-05", isCurrentMonth: true },
    { name: "Fri", date: 6, fullDate: "2026-11-06", isCurrentMonth: true },
    { name: "Sat", date: 7, fullDate: "2026-11-07", isCurrentMonth: true },
  ],
  [
    { name: "Sun", date: 8, fullDate: "2026-11-08", isCurrentMonth: true },
    { name: "Mon", date: 9, fullDate: "2026-11-09", isCurrentMonth: true },
    { name: "Tue", date: 10, fullDate: "2026-11-10", isCurrentMonth: true },
    { name: "Wed", date: 11, fullDate: "2026-11-11", isCurrentMonth: true },
    { name: "Thu", date: 12, fullDate: "2026-11-12", isCurrentMonth: true },
    { name: "Fri", date: 13, fullDate: "2026-11-13", isCurrentMonth: true },
    { name: "Sat", date: 14, fullDate: "2026-11-14", isCurrentMonth: true },
  ],
  [
    { name: "Sun", date: 15, fullDate: "2026-11-15", isCurrentMonth: true },
    { name: "Mon", date: 16, fullDate: "2026-11-16", isCurrentMonth: true },
    { name: "Tue", date: 17, fullDate: "2026-11-17", isCurrentMonth: true },
    { name: "Wed", date: 18, fullDate: "2026-11-18", isCurrentMonth: true },
    { name: "Thu", date: 19, fullDate: "2026-11-19", isCurrentMonth: true },
    { name: "Fri", date: 20, fullDate: "2026-11-20", isCurrentMonth: true },
    { name: "Sat", date: 21, fullDate: "2026-11-21", isCurrentMonth: true },
  ],
  [
    { name: "Sun", date: 22, fullDate: "2026-11-22", isCurrentMonth: true },
    { name: "Mon", date: 23, fullDate: "2026-11-23", isCurrentMonth: true },
    { name: "Tue", date: 24, fullDate: "2026-11-24", isCurrentMonth: true },
    { name: "Wed", date: 25, fullDate: "2026-11-25", isCurrentMonth: true },
    { name: "Thu", date: 26, fullDate: "2026-11-26", isCurrentMonth: true },
    { name: "Fri", date: 27, fullDate: "2026-11-27", isCurrentMonth: true },
    { name: "Sat", date: 28, fullDate: "2026-11-28", isCurrentMonth: true },
  ],
  [
    { name: "Sun", date: 29, fullDate: "2026-11-29", isCurrentMonth: true },
    { name: "Mon", date: 30, fullDate: "2026-11-30", isCurrentMonth: true },
    { name: "Tue", date: 1, fullDate: "2026-12-01", isCurrentMonth: false },
    { name: "Wed", date: 2, fullDate: "2026-12-02", isCurrentMonth: false },
    { name: "Thu", date: 3, fullDate: "2026-12-03", isCurrentMonth: false },
    { name: "Fri", date: 4, fullDate: "2026-12-04", isCurrentMonth: false },
    { name: "Sat", date: 5, fullDate: "2026-12-05", isCurrentMonth: false },
  ],
];


export const meetings: Meeting[] = [
  {
    id: 1,
    title: "Team Meeting",
    day: "Sat",
    date: 1,
    month: 10,
    year: "2025",
    fullDate: "2025-11-01",
    startTime: "09:00",
    endTime: "10:00",
    color: "bg-white border-border",
    project: { name: "CollabSpace AI" },
  },
  {
    id: 2,
    title: "Daily Standup",
    day: "Sat",
    date: 1,
    month: 10,
    year: "2025",
    fullDate: "2025-11-01",
    startTime: "10:00",
    endTime: "11:00",
    color: "bg-white border-border",
    project: { name: "Safarni" },
  },
  {
    id: 3,
    title: "Night Planning",
    day: "Sat",
    date: 1,
    month: 10, 
    year: "2025",
    fullDate: "2025-11-01",
    startTime: "23:00",
    endTime: "23:59",
    color: "bg-white border-border",
    project: { name: "CollabSpace AI" },
  },
  {
    id: 4,
    title: "Morning Sync",
    day: "Sun",
    date: 2,
    month: 10,
    year: "2025",
    fullDate: "2025-11-02",
    startTime: "08:00",
    endTime: "09:00",
    color: "bg-white border-border",
    project: { name: "Vesta" },
  },
  {
    id: 5,
    title: "Project Discussion",
    day: "Sun",
    date: 2,
    month: 10,
    year: "2025",
    fullDate: "2025-11-02",
    startTime: "11:00",
    endTime: "12:00",
    color: "bg-white border-border",
    project: { name: "CollabSpace AI" },
  },
  {
    id: 6,
    title: "Frontend Development",
    day: "Mon",
    date: 3,
    month: 10,
    year: "2025",
    fullDate: "2025-11-03",
    startTime: "13:00",
    endTime: "14:00",
    color: "bg-white border-border",
    project: { name: "Safarni" },
  },
  {
    id: 7,
    title: "Code Review",
    day: "Mon",
    date: 3,
    month: 10,
    year: "2025",
    fullDate: "2025-11-03",
    startTime: "15:00",
    endTime: "16:00",
    color: "bg-white border-border",
    project: { name: "Vesta" },
  },
  {
    id: 8,
    title: "Design Review",
    day: "Tue",
    date: 4,
    month: 10,
    year: "2025",
    fullDate: "2025-11-04",
    startTime: "14:00",
    endTime: "15:00",
    color: "bg-white border-border",
    project: { name: "CollabSpace AI" },
  },
  {
    id: 9,
    title: "Team Brainstorming",
    day: "Tue",
    date: 4,
    month: 10,
    year: "2025",
    fullDate: "2025-11-04",
    startTime: "15:00",
    endTime: "16:00",
    color: "bg-white border-border",
    project: { name: "Safarni" },
  },
  {
    id: 10,
    title: "Product Planning",
    day: "Tue",
    date: 4,
    month: 10,
    year: "2025",
    fullDate: "2025-11-04",
    startTime: "18:00",
    endTime: "19:00",
    color: "bg-white border-border",
    project: { name: "CollabSpace AI" },
  },
  {
    id: 11,
    title: "Client Meeting",
    day: "Wed",
    date: 5,
    month: 10,
    year: "2025",
    fullDate: "2025-11-05",
    startTime: "10:00",
    endTime: "11:00",
    color: "bg-white border-border",
    project: { name: "Vesta" },
  },
  {
    id: 12,
    title: "Sprint Review",
    day: "Wed",
    date: 5,
    month: 10,
    year: "2025",
    fullDate: "2025-11-05",
    startTime: "17:00",
    endTime: "18:00",
    color: "bg-white border-border",
    project: { name: "Safarni" },
  },
  {
    id: 13,
    title: "Evening Discussion",
    day: "Thu",
    date: 6,
    month: 10,
    year: "2025",
    fullDate: "2025-11-06",
    startTime: "19:00",
    endTime: "20:00",
    color: "bg-white border-border",
    project: { name: "CollabSpace AI" },
  },
  {
    id: 14,
    title: "Project Follow-up",
    day: "Thu",
    date: 6,
    month: 10,
    year: "2025",
    fullDate: "2025-11-06",
    startTime: "20:00",
    endTime: "21:00",
    color: "bg-white border-border",
    project: { name: "Vesta" },
  },
  {
    id: 15,
    title: "Sprint Planning",
    day: "Fri",
    date: 7,
    month: 10,
    year: "2025",
    fullDate: "2025-11-07",
    startTime: "16:00",
    endTime: "17:00",
    color: "bg-white border-border",
    project: { name: "Safarni" },
  },
  {
    id: 16,
    title: "Late Night Meeting",
    day: "Fri",
    date: 7,
    month: 10,
    year: "2025",
    fullDate: "2025-11-07",
    startTime: "21:00",
    endTime: "22:00",
    color: "bg-white border-border",
    project: { name: "CollabSpace AI" },
  },
  {
    id: 17,
    title: "Final Discussion",
    day: "Fri",
    date: 7,
    month: 10,
    year: "2025",
    fullDate: "2025-11-07",
    startTime: "23:00",
    endTime: "23:59",
    color: "bg-white border-border",
    project: { name: "Vesta" },
  },
];

