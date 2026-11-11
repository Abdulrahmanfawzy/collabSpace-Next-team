import { z } from "zod";

export const assignTaskSchema = z.object({
  assignedTo: z
    .string()
    .trim()
    .regex(/^[1-9]\d*$/, "Enter a positive whole number")
    .refine(
      (value) => Number.isSafeInteger(Number(value)),
      "Number is too large"
    ),
});

export type AssignTaskFormValues = z.infer<typeof assignTaskSchema>;
