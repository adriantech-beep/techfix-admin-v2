import { z } from "zod";

export const guideSchema = z.object({
  title: z.string().min(1, "Title is required"),
  deviceType: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  summary: z.string().optional(),
  estimatedTimeMinutes: z.number().optional(),
  author: z.string().min(1, "Author is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  tools: z.array(z.string()).default([]),
  parts: z
    .array(
      z.object({
        name: z.string().min(1, "Part name is required"),
        partNumber: z.string().optional(),
        qty: z.number().optional(),
        link: z.string().optional(),
      })
    )
    .default([]),
  steps: z
    .array(
      z.object({
        title: z.string().optional(),
        bodyMarkdown: z.string().optional(),
        actionType: z.string().optional(),
        images: z
          .array(
            z.object({
              url: z.string().optional(),
              caption: z.string().optional(),
              alt: z.string().optional(),
              hotspotAnnotations: z
                .array(
                  z.object({
                    x: z.number(),
                    y: z.number(),
                    note: z.string(),
                  })
                )
                .default([]),
              file: z.any().optional(),
            })
          )
          .default([]),
      })
    )
    .default([]),
});

// 🔥 THIS is now your single source of truth
export type GuideForm = z.infer<typeof guideSchema>;
