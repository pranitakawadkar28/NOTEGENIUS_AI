import { z } from "zod";

export const generateNoteSchema = z.object({
  topic: z
  .string()
  .trim()
  .min(1, "Topic is required")
  .max(200),
  
  classLevel: z
  .string()
  .trim()
  .optional(),

  examType: z
  .string()
  .trim()
  .optional(),

  revisionMode: z
  .boolean()
  .optional()
  .default(false),

  includeDiagram: z
  .boolean()
  .optional()
  .default(false),
  
  includeChart: z
  .boolean()
  .optional()
  .default(false),
});