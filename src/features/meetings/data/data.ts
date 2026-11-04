export type CalendarDay = {
  name: string;
  date: number;
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