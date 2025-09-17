import { useFieldArray, useFormContext } from "react-hook-form";
import type { GuideForm } from "./guideSchema";
import StepImage from "./StepImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CircleX } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ToolsNeededSelector from "./ToolsNeededSelector";
const Steps = () => {
  const { control, register } = useFormContext<GuideForm>();

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const onAddStep = () =>
    appendStep({
      title: "",
      bodyMarkdown: "",
      actionType: undefined,
      expectedOutcome: "",
      warnings: "",
      toolsNeeded: [],
      images: [],
    });

  return (
    <>
      {stepFields.map((step, stepIndex) => (
        <Card className="w-full px-4 rounded-md" key={stepIndex}>
          <div className="flex justify-between items-start p-2">
            <h3 className="font-semibold">Step {stepIndex + 1}</h3>

            <CircleX
              type="button"
              onClick={() => removeStep(stepIndex)}
              className="text-red-600 cursor-pointer"
            />
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>{`View step ${
                stepIndex + 1
              } details`}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 text-balance">
                <Input
                  {...register(`steps.${stepIndex}.title` as const)}
                  placeholder="Step title"
                  defaultValue={step.title ?? ""}
                  className="mb-2"
                />
                <Textarea
                  {...register(`steps.${stepIndex}.bodyMarkdown` as const)}
                  placeholder="Step description"
                  defaultValue={step.bodyMarkdown ?? ""}
                  className="mb-2"
                />
                <Input
                  {...register(`steps.${stepIndex}.expectedOutcome` as const)}
                  placeholder="Expected outcome"
                  defaultValue={step.expectedOutcome ?? ""}
                  className="mb-2"
                />

                <Textarea
                  {...register(`steps.${stepIndex}.warnings` as const)}
                  placeholder="Warnings"
                  defaultValue={step.warnings ?? ""}
                  className="mb-2"
                />
                <Controller
                  control={control}
                  {...register(`steps.${stepIndex}.actionType` as const)}
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
                <StepImage stepIndex={stepIndex} />

                <ToolsNeededSelector stepIndex={stepIndex} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}

      <div className="flex gap-2">
        <Button
          className="rounded-full bg-purple-700"
          type="button"
          onClick={onAddStep}
        >
          Add Step
        </Button>
      </div>
    </>
  );
};

export default Steps;
