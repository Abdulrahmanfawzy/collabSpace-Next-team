import { z } from "zod";

export const updateTaskSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Task name is required")
    .max(255, "Task name must be 255 characters or less"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  status: z.enum(["Pending", "In Progress", "In Review", "Completed"]),
});

export type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>;
