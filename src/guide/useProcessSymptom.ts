import { uploadImage } from "@/services/apiUploadImage";
import type { GuideForm } from "./guideSchema";

export async function processSymptom(symptom: GuideForm["symptom"]) {
  const uploadedImages = await Promise.all(
    symptom.images.map(async (image) => {
      if (image.file instanceof File) {
        const url = await uploadImage({ file: image.file });
        return {
          url,
          caption: image.caption || "",
          alt: image.alt || "",
        };
      }

      if (image.url) {
        return {
          url: image.url,
          caption: image.caption || "",
          alt: image.alt || "",
        };
      }

      return {
        url: "",
        caption: image.caption || "",
        alt: image.alt || "",
      };
    })
  );

  return {
    description: symptom.description || "",
    images: uploadedImages.filter(Boolean),
  };
}
