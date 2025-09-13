"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CircleX } from "lucide-react";
import {
  Controller,
  type Control,
  type UseFormRegister,
  useFieldArray,
  type UseFieldArrayRemove,
  type UseFormSetValue,
  // type FieldArrayWithId,
  type UseFormReturn,
} from "react-hook-form";

import type { GuideForm } from "./guideSchema";
import { useState } from "react";
import StepImage from "./StepImage";

type StepsProps = {
  form: UseFormReturn<GuideForm>; // ✅ form drilled here
  // step: FieldArrayWithId<GuideForm, "steps", "id">;
  step: GuideForm["steps"][number];
  index: number;
  removeStep: UseFieldArrayRemove;
  control: Control<GuideForm>;
  register: UseFormRegister<GuideForm>;
  setValue: UseFormSetValue<GuideForm>;
};

const Steps = ({
  // step,
  index,
  removeStep,
  control,
  register,
  setValue,
}: StepsProps) => {
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: `steps.${index}.images`,
  });

  const [previews, setPreviews] = useState<Record<string, string>>({});

  const handleFileChange = (
    file: File,
    stepIndex: number,
    imgIndex: number
  ) => {
    const url = URL.createObjectURL(file);
    setPreviews((prev) => ({
      ...prev,
      [`${stepIndex}-${imgIndex}`]: url,
    }));

    // ✅ store the file into RHF using setValue
    setValue(`steps.${stepIndex}.images.${imgIndex}.file`, file, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <Card className="w-full px-4 rounded-md">
      {/* Remove Step Button */}
      <div className="w-full flex justify-end">
        <CircleX
          className="text-red-600 cursor-pointer"
          onClick={() => removeStep(index)}
        />
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>{`Step ${index + 1}`}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {/* Step Title */}
            <Input
              {...register(`steps.${index}.title`)}
              placeholder="Step Title"
            />

            {/* Step Description */}
            <Textarea
              {...register(`steps.${index}.bodyMarkdown`)}
              placeholder="Step description"
            />

            {/* Action Type */}
            <Controller
              // control={control}
              // name={`steps.${index}.actionType`}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select action type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instruction">Instruction</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="measurement">Measurement</SelectItem>
                    <SelectItem value="decision">Decision</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {/* Add Image Button */}
            <Button
              type="button"
              onClick={() =>
                appendImage({
                  url: "",
                  file: null,
                  caption: "",
                  alt: "",
                  thumbnailUrl: "",
                  hotspotAnnotations: [],
                })
              }
            >
              Add Image
            </Button>

            {/* Step Images */}
            <StepImage
              imageFields={imageFields}
              handleFileChange={handleFileChange}
              previews={previews}
              removeImage={removeImage}
              index={index}
              register={register}
              control={control}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default Steps;
