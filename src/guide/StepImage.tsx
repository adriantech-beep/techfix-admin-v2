import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { GuideForm } from "./guideSchema";
import ImageMarkerForm from "./ImageMarkerForm";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { CloudUpload } from "lucide-react";
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
    <div className="flex flex-col gap-2 ">
      <div className="grid grid-cols-1 gap-2">
        {imageFields.map((img, imgIndex) => (
          <div
            key={img.id}
            className="w-full relative flex flex-col bg-white/5 rounded-2xl border border-dashed border-gray-400 overflow-hidden shadow-md group"
          >
            <button
              type="button"
              onClick={() => removeImage(imgIndex)}
              className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white rounded-full py-1 px-2 hover:bg-red-500 cursor-pointer"
            >
              ✕
            </button>

            <div className="h-40 flex flex-col items-center justify-center color-gradient p-4 text-center">
              <CloudUpload className="w-12 h-12 text-gray-300 group-hover:text-white transition-colors" />
              <input
                id={`file-${stepIndex}-${imgIndex}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  handleFileChange(e.target.files[0], imgIndex)
                }
              />
              <label
                htmlFor={`file-${stepIndex}-${imgIndex}`}
                className="mt-3 cursor-pointer px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-md hover:bg-indigo-500 transition-colors"
              >
                Upload Image
              </label>
            </div>

            <div className="w-full p-4 bg-slate-50 border-t border-gray-200">
              <ImageMarkerForm
                stepIndex={stepIndex}
                imgIndex={imgIndex}
                previewUrl={previews[`${stepIndex}-${imgIndex}`]}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-dashed border-purple-600 text-indigo-600 hover:bg-indigo-50"
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
          <Image className="w-5 h-5" />
          Add Image
        </Button>
      </div>
    </div>
  );
};

export default StepImage;
