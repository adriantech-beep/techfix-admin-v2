import { z } from "zod";

export const guideSchema = z.object({
  _id: z.string().optional(),

  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),

  deviceType: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  summary: z.string().optional(),
  estimatedTimeMinutes: z.number().optional(),

  difficulty: z.enum(["Easy", "Medium", "Hard"]).default("Easy"),

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
        actionType: z
          .enum(["instruction", "test", "measurement", "decision"])
          .optional(),
        expectedOutcome: z.string().optional(),
        warnings: z.string().optional(),
        toolsNeeded: z.array(z.string()).default([]),
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

export type GuideForm = z.infer<typeof guideSchema>;
