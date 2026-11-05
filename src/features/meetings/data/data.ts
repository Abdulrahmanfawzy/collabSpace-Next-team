
export type CalendarDay = {
  name: string;
  date: number;
};

export type Meeting = {
  id: number;
  title: string;
  day: string;
  date: number;
  startTime: string;
  endTime: string;
  color: string;
};

export const weekDays = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
];

export const month: CalendarDay[][] = [
  [
    { name: "Sun", date: 30 },
    { name: "Mon", date: 1 },
    { name: "Tue", date: 2 },
    { name: "Wed", date: 3 },
    { name: "Thu", date: 4 },
    { name: "Fri", date: 5 },
    { name: "Sat", date: 6 },
  ],
  [
    { name: "Sun", date: 7 },
    { name: "Mon", date: 8 },
    { name: "Tue", date: 9 },
    { name: "Wed", date: 10 },
    { name: "Thu", date: 11 },
    { name: "Fri", date: 12 },
    { name: "Sat", date: 13 },
  ],
  [
    { name: "Sun", date: 14 },
    { name: "Mon", date: 15 },
    { name: "Tue", date: 16 },
    { name: "Wed", date: 17 },
    { name: "Thu", date: 18 },
    { name: "Fri", date: 19 },
    { name: "Sat", date: 20 },
  ],
  [
    { name: "Sun", date: 21 },
    { name: "Mon", date: 22 },
    { name: "Tue", date: 23 },
    { name: "Wed", date: 24 },
    { name: "Thu", date: 25 },
    { name: "Fri", date: 26 },
    { name: "Sat", date: 27 },
  ],
  [
    { name: "Sun", date: 28 },
    { name: "Mon", date: 29 },
    { name: "Tue", date: 30 },
    { name: "Wed", date: 31 },
    { name: "Thu", date: 1 },
    { name: "Fri", date: 2 },
    { name: "Sat", date: 3 },
  ],
];

export const meetings: Meeting[] = [
  {
    id: 1,
    title: "Team Meeting",
    day: "Sun",
    date: 30,
    startTime: "09:00",
    endTime: "10:00",
    color: "bg-white border-border",
  },
  {
    id: 2,
    title: "Daily Standup",
    day: "Sun",
    date: 30,
    startTime: "10:00",
    endTime: "11:00",
    color: "bg-white border-border",
  },
  {
    id: 3,
    title: "Night Planning",
    day: "Sun",
    date: 30,
    startTime: "23:00",
    endTime: "23:59",
    color: "bg-white border-border",
  },
  {
    id: 4,
    title: "Morning Sync",
    day: "Mon",
    date: 1,
    startTime: "08:00",
    endTime: "09:00",
    color: "bg-white border-border",
  },
  {
    id: 5,
    title: "Project Discussion",
    day: "Mon",
    date: 1,
    startTime: "11:00",
    endTime: "12:00",
    color: "bg-white border-border",
  },
  {
    id: 6,
    title: "Frontend Development",
    day: "Tue",
    date: 2,
    startTime: "13:00",
    endTime: "14:00",
    color: "bg-white border-border",
  },
  {
    id: 7,
    title: "Code Review",
    day: "Tue",
    date: 2,
    startTime: "15:00",
    endTime: "16:00",
    color: "bg-white border-border",
  },
  {
    id: 8,
    title: "Design Review",
    day: "Wed",
    date: 3,
    startTime: "14:00",
    endTime: "15:00",
    color: "bg-white border-border",
  },
  {
    id: 9,
    title: "Team Brainstorming",
    day: "Wed",
    date: 3,
    startTime: "15:00",
    endTime: "16:00",
    color: "bg-white border-border",
  },
  {
    id: 10,
    title: "Product Planning",
    day: "Wed",
    date: 3,
    startTime: "18:00",
    endTime: "19:00",
    color: "bg-white border-border",
  },
  {
    id: 11,
    title: "Client Meeting",
    day: "Thu",
    date: 4,
    startTime: "10:00",
    endTime: "11:00",
    color: "bg-white border-border",
  },
  {
    id: 12,
    title: "Sprint Review",
    day: "Thu",
    date: 4,
    startTime: "17:00",
    endTime: "18:00",
    color: "bg-white border-border",
  },
  {
    id: 13,
    title: "Evening Discussion",
    day: "Fri",
    date: 5,
    startTime: "19:00",
    endTime: "20:00",
    color: "bg-white border-border",
  },
  {
    id: 14,
    title: "Project Follow-up",
    day: "Fri",
    date: 5,
    startTime: "20:00",
    endTime: "21:00",
    color: "bg-white border-border",
  },
  {
    id: 15,
    title: "Sprint Planning",
    day: "Sat",
    date: 6,
    startTime: "16:00",
    endTime: "17:00",
    color: "bg-white border-border",
  },
  {
    id: 16,
    title: "Late Night Meeting",
    day: "Sat",
    date: 6,
    startTime: "21:00",
    endTime: "22:00",
    color: "bg-white border-border",
  },
  {
    id: 17,
    title: "Final Discussion",
    day: "Sat",
    date: 6,
    startTime: "23:00",
    endTime: "23:59",
    color: "bg-white border-border",
  },
];
