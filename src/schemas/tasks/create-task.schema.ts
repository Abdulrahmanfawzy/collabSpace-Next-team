import { z } from "zod";

const positiveIntegerInput = z
  .string()
  .trim()
  .regex(/^[1-9]\d*$/, "Enter a positive whole number")
  .refine((value) => Number.isSafeInteger(Number(value)), "Number is too large");

const optionalPositiveIntegerInput = z.union([
  z.literal(""),
  positiveIntegerInput,
]);

const optionalDateInput = z.string().refine((value) => {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}, "Enter a valid date");

export const createTaskSchema = z.object({
  projectId: positiveIntegerInput,
  name: z
    .string()
    .trim()
    .min(1, "Task name is required")
    .max(255, "Task name must be 255 characters or less"),
  description: z.string().trim(),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  status: z.enum(["Pending", "In Progress", "In Review", "Completed"]),
  assignedTo: optionalPositiveIntegerInput,
  dueDate: optionalDateInput,
});

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;
