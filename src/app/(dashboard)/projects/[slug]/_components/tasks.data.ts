import { TaskColumn } from "../../../../../types/tasks.types";
import avatar1 from "../../../../../assets/images/avatar-one.jpg";
import avatar2 from "../../../../../assets/images/avatar-two.jpg";
import avatar3 from "../../../../../assets/images/avatar-thre.jpg";

export const taskColumns: TaskColumn[] = [
  {
    id: "todo",
    title: "To-do",
    tasks: [
      {
        id: "1",
        title: "Create Wireframes",
        description: "Initial layout and structure for main page",
        status: "todo",
        priority: "high",
        assignees: [
          {
            id: "1",
            name: "John Doe",
            avatar: avatar1,
          },
          {
            id: "2",
            name: "Jane Smith",
            avatar: avatar2,
          },
          {
            id: "3",
            name: "Bob Johnson",
            avatar: avatar3,
          }
        ],
        commentsCount: 8,
        dueDate: "Dec 12",
      },
      {
        id: "2",
        title: "User Research Analysis",
        description: "Initial layout and structure for main page",
        status: "todo",
        priority: "medium",
        assignees: [
          {
            id: "1",
            name: "John Doe",
            avatar: avatar1,
          },
          {
            id: "2",
            name: "Jane Smith",
            avatar: avatar2,
          },
          {
            id: "3",
            name: "Bob Johnson",
            avatar: avatar3,
          }
        ],
        commentsCount: 8,
        dueDate: "Dec 12",
      },
      {
        id: "3",
        title: "Design System Updates",
        description: "Update design system components and guidelines",
        status: "todo",
        priority: "low",
        assignees: [
          {
            id: "1",
            name: "John Doe",
            avatar: avatar1,
          },
          {
            id: "2",
            name: "Jane Smith",
            avatar: avatar2,
          },
          {
            id: "3",
            name: "Bob Johnson",
            avatar: avatar3,
          }
        ],
        commentsCount: 8,
        dueDate: "Dec 12",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "Chat Screen Prototyping",
        description: "Create interactive prototype for chat screen",
        status: "in-progress",
        priority: "high",
        progress: 62,
        assignees: [
          {
            id: "1",
            name: "John Doe",
            avatar: avatar1,
          },
          {
            id: "2",
            name: "Jane Smith",
            avatar: avatar2,
          },
          {
            id: "3",
            name: "Bob Johnson",
            avatar: avatar3,
          }
        ],
        commentsCount: 8,
        dueDate: "Dec 12",
      },
    ],
  },
  {
    id: "in-review",
    title: "In Review",
    tasks: [
      {
        id: "4",
        title: "Mobile Responsiveness",
        description: "Create interactive prototype for chat screen",
        status: "in-review",
        priority: "high",
        assignees: [
          {
            id: "1",
            name: "John Doe",
            avatar: avatar1,
          },
          {
            id: "2",
            name: "Jane Smith",
            avatar: avatar2,
          },
          {
            id: "3",
            name: "Bob Johnson",
            avatar: avatar3,
          }
        ],
        commentsCount: 8,
        dueDate: "Dec 12",
        reviewer: {
          name: "Alice Johnson",
          avatar: avatar1,
        },
      },
    ],
  },
  {
    id: "completed",
    title: "Completed Tasks",
    tasks: [
      {
        id: "5",
        title: "Login Screen",
        description: "Create interactive prototype for chat screen",
        status: "completed",
        priority: "high",
        assignees: [
            {
            id: "1",
            name: "John Doe",
            avatar: avatar1,
          },
          {
            id: "2",
            name: "Jane Smith",
            avatar: avatar2,
          },
          {
            id: "3",
            name: "Bob Johnson",
            avatar: avatar3,
          }
        ],
        commentsCount: 8,
        dueDate: "Dec 12",
      },
    ],
  },
]