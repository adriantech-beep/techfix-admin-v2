import { z } from "zod";

export const guideSchema = z.object({
  title: z.string().min(1, "Title is required"),
  deviceType: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  summary: z.string().optional(),
  estimatedTimeMinutes: z.number().optional(),
  author: z.string().optional(),
  difficulty: z.string().optional(),
  tools: z.array(z.string()).default([]).optional(),
  parts: z
    .array(
      z.object({
        name: z.string(),
        partNumber: z.string().optional(),
        qty: z.number().optional(),
        link: z.string().optional(),
      })
    )
    .default([])
    .optional(),
  //FIXME: Note that the schema have commented out codes for troubleshooting of the mismatch error
  steps: z
    .array(
      z.object({
        // index: z.number(),
        title: z.string().min(1, "Step title is required").optional(),
        bodyMarkdown: z.string().optional(),
        // actionType: z.enum(["instruction", "test", "measurement", "decision"]),
        // expectedOutcome: z.string().optional(),
        // warnings: z.array(z.string()).default([]),
        // toolsNeeded: z.array(z.string()).default([]),
        images: z
          .array(
            z.object({
              url: z.string().optional(),
              file: z.any().optional(), // File objects
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
            })
          )
          .default([]),
        // partsNeeded: z
        //   .array(
        //     z.object({
        //       name: z.string().min(1, "Part name is required"),
        //       partNumber: z.string().optional(),
        //       qty: z.number().optional(),
        //       link: z.string().optional(),
        //     })
        //   )
        //   .default([]),
      })
    )
    .default([]),
});

export type GuideForm = z.infer<typeof guideSchema>;
