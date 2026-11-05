export const projects = [
    { id: "1", name: "Alpha", done: 100, total: 140, color: "purple" },
    { id: "2", name: "SepetGo", done: 52, total: 120, color: "teal" },
  ];
  
  export const files = [
    {
      id: "1",
      name: "UX_Research_Summary.pdf",
      author: "Mohanad Wahib",
      time: "13:00",
      downloadUrl: "/files/ux.pdf",
    },
    {
      id: "2",
      name: "Dashboard_Layout_React.jsx",
      author: "Wahib salem",
      time: "14:06",
      downloadUrl: "/files/dashboard.jsx",
    },
    {
      id: "3",
      name: "Database_Schema_v2.sql",
      author: "Mohamed Nadir",
      time: "13:00",
      downloadUrl: "/files/schema.sql",
    },
  ]; 
  export const tasks = [
    { id: "1", title: "Creat Wireframes", priority: "High", due: "due today", progress: 82 },
    { id: "2", title: "User Research", priority: "Medium", due: "due Dec 18", progress: 52 },
    { id: "3", title: "Design System Updates", priority: "Low", due: "due Dec 20", progress: 42 },
  ];
  
  export const teams = ["UI/UX", "Frontend", "Backend"];
  
  export const members = [
    { id: "1", name: "Mohamed wahib", isLeader: true, done: 12, total: 14, avatarUrl: "/avatars/1.jpg" },
    { id: "2", name: "Sara Hassan", done: 10, total: 16 },
    { id: "3", name: "Ali Mohamed", done: 4, total: 12 },
    { id: "4", name: "Khalid Mousa", done: 11, total: 16 },
    { id: "5", name: "Mahmoud Salah", done: 8, total: 14 },
    { id: "6", name: "Ahmed Mohamed", done: 6, total: 12 },
  ];
  export const people = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
    }));
  
    
  export const meetings = [
    
    {
      id: "1",
      title: "Design Review",
      date: "Today",
      time: "14:00 - 15:00",
      attendees: people(6),
    },
    {
      id: "2",
      title: "Sprint Planning Meeting",
      date: "Dec 12",
      time: "13:00 - 13:30",
      attendees: people(7),
    },
    {
      id: "3",
      title: "UX Feedback Session",
      date: "Dec 18",
      time: "14:00 - 15:00",
      attendees: people(8),
    },
  ];