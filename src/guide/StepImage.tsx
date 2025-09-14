import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { GuideForm } from "./guideSchema";
import ImageMarkerForm from "./ImageMarkerForm";
import { Button } from "@/components/ui/button";

type Props = {
  stepIndex: number;
};

const StepImage = ({ stepIndex }: Props) => {
  const { control, setValue } = useFormContext<GuideForm>();

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: `steps.${stepIndex}.images`,
  });

  const [previews, setPreviews] = useState<Record<string, string>>({});

  const handleFileChange = (file: File, imgIndex: number) => {
    const url = URL.createObjectURL(file);
    setPreviews((prev) => ({ ...prev, [`${stepIndex}-${imgIndex}`]: url }));

    setValue(`steps.${stepIndex}.images.${imgIndex}.file`, file, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(`steps.${stepIndex}.images.${imgIndex}.url`, url, {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  return (
    <div className="space-y-2">
      {imageFields.map((img, imgIndex) => (
        <div key={img.id} className="flex flex-col gap-2 w-full">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] &&
              handleFileChange(e.target.files[0], imgIndex)
            }
          />

          {previews[`${stepIndex}-${imgIndex}`] && (
            <div>
              <img
                src={previews[`${stepIndex}-${imgIndex}`]}
                alt={img.caption ?? `preview-${imgIndex}`}
                className="max-w-xs rounded"
              />
            </div>
          )}

          <div className="space-y-2">
            <ImageMarkerForm
              stepIndex={stepIndex}
              imgIndex={imgIndex}
              previewUrl={previews[`${stepIndex}-${imgIndex}`]}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => removeImage(imgIndex)}
              variant="destructive"
            >
              Remove Image
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          appendImage({
            url: "",
            file: undefined,
            caption: "",
            alt: "",
            hotspotAnnotations: [],
          })
        }
      >
        Add Image
      </Button>
    </div>
  );
};

export default StepImage;
