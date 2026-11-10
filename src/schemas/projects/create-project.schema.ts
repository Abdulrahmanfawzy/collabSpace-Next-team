import { z } from "zod";

export const createProjectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Enter a project name")
      .max(120, "Project name must be 120 characters or less"),
    description: z.string().trim().min(1, "Enter a project description"),
    start_date: z.string().min(1, "Choose a start date"),
    deadline: z.string().min(1, "Choose a deadline"),
    status: z.enum(["Planning", "In Progress", "On Hold", "Completed"]),
    priority: z.enum(["Low", "Medium", "High", "Critical"]),
  })
  .superRefine((values, context) => {
    if (
      values.start_date &&
      values.deadline &&
      values.deadline < values.start_date
    ) {
      context.addIssue({
        code: "custom",
        message: "Deadline must be on or after the start date",
        path: ["deadline"],
      });
    }
  });

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;
