import type {
  PDFFile,
  ProfileActivity,
  ProfileTask,
  ProfileUser,
} from "../types/profile.types";

export const profileUser: ProfileUser = {
  id: 1,
  fullName: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 234 567 890",
  jobTitle: "Senior UI/UX Designer",
  company: "Creative Studio",
  location: "New York, USA",
  avatar: "https://i.pravatar.cc/300?img=12",
  bio: "Creative designer passionate about building meaningful digital experiences. I enjoy collaborating with teams to transform ideas into intuitive and beautiful products.",
  experience: "5+ Years",
  joinDate:"Apr 22022",
  skills: [
    "UI Design",
    "UX Research",
    "Figma",
    "Prototyping",
    "Wireframing",
    "Design Systems",
  ],
};

export const profileStats = [
  {
    id: 1,
    label: "Completed Tasks",
    value: "124",
  },
  {
    id: 2,
    label: "Hours Worked",
    value: "1,240",
  }
];

export const profileActivities: ProfileActivity[] = [
  {
    id: 1,
    title: "Website Redesign",
    timestamp: "2 hours ago",
    
  },
  {
    id: 2,
    title: "Mobile Application",
    timestamp: "3 hours ago",
   
  },
  {
    id: 3,
    title: "Design System",
    timestamp: "30 mints ago",
    
  },
];

export const todoTasks: ProfileTask[] = [
  { id: 1, name: "Create user interview", progress: 12 },
  { id: 2, name: "Create Wireframes", progress: 6 },
  { id: 3, name: "Create user flow", progress: 0 },
  { id: 4, name: "Design log in screen", progress: 0 },
];

export const completedTasks: ProfileTask[] = [
  { id: 5, name: "Update design system", progress: 100 },
  { id: 6, name: "Create information architecture", progress: 100 },
  { id: 7, name: "Make survey", progress: 100 },
  { id: 8, name: "Create Wireframes", progress: 100 },
  { id: 9, name: "Create Wireframes", progress: 100 },
];


export const profileFiles: PDFFile[] = [
  {
    id: 1,
    name: "Project Proposal.pdf",
    author: "ahmed hassan",
    date: "15mints ago",
    size: "2.4 MB",
    url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
  },
  {
    id: 2,
    name: "Design Guidelines.pdf",
    author: "omar mohamed",
    date: "1hour ago",
    size: "1.8 MB",
    url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
  },
  {
    id: 3,
    name: "Project Report.pdf",
    author: "ali mohamed",
    date: "30mints ago",
    size: "3.1 MB",
    url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
  },
  {
    id: 4,
    name: "Meeting Notes.pdf",
    author: "isra mohamed",
    date: "3hours ago",
    size: "1.2 MB",
    url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
  },
  {
    id: 5,
    name: "UI Components.pdf",
    author: "marwa ahmed",
    date: "3hours ago",
    size: "2.8 MB",
    url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
  },
  {
    id: 6,
    name: "Final Documentation.pdf",
    author: "marwa ahmed",
    date: "1hour ago",
    size: "4.2 MB",
    url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
  },
];
