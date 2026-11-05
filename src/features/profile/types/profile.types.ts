export type ProfileUser = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  location: string;
  avatar: string;
  bio: string;
  experience: string;
  joinDate: string;
  skills: string[];
};

export type ProfileActivity = {
  id: number;
  title: string;
  timestamp: string;
};

export type ProfileTask = {
  id: number;
  name: string;
  progress: number;
  
};

export type PDFFile = {
  id: number;
  name: string;
  author: string;
  date: string;
  size: string;
  url: string;
};
