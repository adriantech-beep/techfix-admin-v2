import { uploadImage } from "@/services/apiUploadImage";
import type { GuideForm } from "./guideSchema";

export async function processSteps(steps: GuideForm["steps"]) {
  return Promise.all(
    steps.map(async (step, idx) => {
      const uploadedImages = await Promise.all(
        step.images.map(async (img) => {
          if (img.file instanceof File) {
            const url = await uploadImage({ file: img.file });
            return {
              url,
              caption: img.caption || "",
              alt: img.alt || "",
              hotspotAnnotations: img.hotspotAnnotations || [],
            };
          }
          if (img.url) {
            return {
              url: img.url,
              caption: img.caption || "",
              alt: img.alt || "",
              hotspotAnnotations: img.hotspotAnnotations || [],
            };
          }
          // ✅ fallback to schema-safe object
          return {
            url: "",
            caption: img.caption || "",
            alt: img.alt || "",
            hotspotAnnotations: img.hotspotAnnotations || [],
          };
        })
      );

      return {
        ...step,
        index: idx,
        images: uploadedImages.filter(Boolean),
      };
    })
  );
}
