import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { GuideForm } from "./guideSchema";
import { CloudUpload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type PreviewMap = Record<string, string>;

const Symptom = () => {
  const { control, register, setValue, watch } = useFormContext<GuideForm>();

  const {
    fields,
    append: appendImage,
    remove,
  } = useFieldArray({
    control,
    name: "symptom.images" as const,
  });

  const [previews, setPreviews] = useState<PreviewMap>({});

  useEffect(() => {
    const current = watch("symptom");
    if (!current) {
      setValue("symptom", { description: "", images: [] });
    }
  }, [setValue, watch]);

  const addImagePlaceholder = () =>
    appendImage({ url: "", caption: "", alt: "", file: undefined });

  const handleFileChange = (
    file: File | undefined,
    index: number,
    fieldId: string
  ) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviews((p) => ({ ...p, [fieldId]: url }));

    setValue(`symptom.images.${index}.file`, file, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(`symptom.images.${index}.url`, url, {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const removeImage = (index: number, fieldId: string) => {
    const prevUrl = previews[fieldId];
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
      setPreviews((p) => {
        const copy = { ...p };
        delete copy[fieldId];
        return copy;
      });
    }
    remove(index);
  };

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((u) => URL.revokeObjectURL(u));
    };
  }, [previews]);

  return (
    <Card className="rounded-2xl shadow-md border p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Symptom</CardTitle>
      </CardHeader>
      <Input
        {...register("symptom.description" as const)}
        placeholder="Short symptom description"
      />

      <div>
        <div className="h-36 flex items-center justify-center border rounded">
          <div className="text-center text-sm text-gray-500">
            <div className="flex flex-col items-center gap-2">
              Click “Add image” to upload
              <button
                type="button"
                onClick={addImagePlaceholder}
                className="px-3 py-1 rounded bg-indigo-600 text-white"
              >
                Add image
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
          {fields.map((f, idx) => {
            const inputId = `symptom-file-${f.id}`;
            const previewUrl = previews[f.id] ?? f.url;
            return (
              <div key={f.id} className="border p-2 rounded">
                <input
                  id={inputId}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0], idx, f.id)
                  }
                />

                <label htmlFor={inputId} className="block cursor-pointer mb-2">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={
                        (watch(`symptom.images.${idx}.alt`) as string) ??
                        "symptom preview"
                      }
                      className="w-full h-36 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-36 flex flex-col items-center justify-center color-gradient rounded text-gray-800">
                      <CloudUpload className="w-8 h-8" />
                      <div className="ml-2">Upload</div>
                    </div>
                  )}
                </label>

                <div className="flex flex-col gap-2">
                  <Input
                    {...register(`symptom.images.${idx}.caption` as const)}
                    placeholder="Caption (optional)"
                  />
                  <Input
                    {...register(`symptom.images.${idx}.alt` as const)}
                    placeholder="Alt text (for accessibility)"
                  />
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => removeImage(idx, f.id)}
                    className="text-sm px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                  <label
                    htmlFor={inputId}
                    className="text-sm px-2 py-1 bg-blue-600 text-white rounded cursor-pointer"
                  >
                    Change
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default Symptom;
