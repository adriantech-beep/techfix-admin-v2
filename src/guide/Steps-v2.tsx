// import { Card } from "@/components/ui/card";
// import type {
//   FieldArrayWithId,
//   UseFieldArrayRemove,
//   UseFormRegister,
//   UseFormSetValue,
// } from "react-hook-form";
// import type { GuideForm } from "./guideSchema";
// import { CircleX } from "lucide-react";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Controller, useFieldArray, useFormContext } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import StepImage from "./StepImage";

// type StepProps = {
//   step: FieldArrayWithId<GuideForm, "steps", "id">;
//   idx: number;
//   register: UseFormRegister<GuideForm>;
//   removeStep: UseFieldArrayRemove;
//   setValue: UseFormSetValue<GuideForm>;
// };

// const Steps = ({ idx, step, register, removeStep, setValue }: StepProps) => {
//   const [previews, setPreviews] = useState<Record<string, string>>({});
//   const { control } = useFormContext<GuideForm>();

//   const {
//     fields: imageFields,
//     append: appendImage,
//     remove: removeImage,
//   } = useFieldArray({
//     control,
//     name: `steps.${idx}.images` as const,
//   });

//   const handleFileChange = (
//     file: File,
//     stepIndex: number,
//     imgIndex: number
//   ) => {
//     const url = URL.createObjectURL(file);
//     setPreviews((prev) => ({
//       ...prev,
//       [`${stepIndex}-${imgIndex}`]: url,
//     }));

//     // ✅ store the file into RHF using setValue
//     setValue(`steps.${stepIndex}.images.${imgIndex}.file`, file, {
//       shouldDirty: true,
//       shouldValidate: true,
//     });
//   };
//   console.log(step);
//   return (
//     <Card className="w-full px-4 rounded-md">
//       <div className="w-full flex justify-end">
//         <CircleX
//           className="text-red-600 cursor-pointer"
//           onClick={() => removeStep(idx)}
//         />
//       </div>

//       <Accordion
//         type="single"
//         collapsible
//         className="w-full"
//         defaultValue="item-1"
//       >
//         <AccordionItem value="item-1">
//           <AccordionTrigger>{`Step ${idx + 1}`}</AccordionTrigger>
//           <AccordionContent className="flex flex-col gap-4 text-balance">
//             <Input
//               {...register(`steps.${idx}.title`)}
//               placeholder="Step Title"
//               defaultValue={step.title ?? ""}
//             />

//             <Textarea
//               {...register(`steps.${idx}.bodyMarkdown`)}
//               placeholder="Step description"
//               defaultValue={step.bodyMarkdown ?? ""}
//             />

//             <Controller
//               control={control}
//               name={`steps.${idx}.actionType`}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select action type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="instruction">Instruction</SelectItem>
//                     <SelectItem value="test">Test</SelectItem>
//                     <SelectItem value="measurement">Measurement</SelectItem>
//                     <SelectItem value="decision">Decision</SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             />

//             <Button
//               type="button"
//               onClick={() =>
//                 appendImage({
//                   url: "",
//                   file: undefined,
//                   caption: "",
//                   alt: "",
//                   // thumbnailUrl: "",
//                   hotspotAnnotations: [],
//                 })
//               }
//             >
//               Add Image
//             </Button>

//             <StepImage
//               imageFields={imageFields}
//               handleFileChange={handleFileChange}
//               previews={previews}
//               removeImage={removeImage}
//               idx={idx}
//               register={register}
//               control={control}
//             />
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </Card>
//   );
// };

// export default Steps;
import { Card } from "@/components/ui/card";
import {
  useFieldArray,
  type Control,
  type FieldArrayWithId,
  type UseFieldArrayRemove,
  // FieldArrayWithId,
  // UseFieldArrayRemove,
  type UseFormRegister,
  type UseFormSetValue,
  // UseFormSetValue,
  // Control,
} from "react-hook-form";
import type { GuideForm } from "./guideSchema";
import { CircleX } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import StepImage from "./StepImage";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Controller } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import StepImage from "./StepImage";

type StepProps = {
  step: FieldArrayWithId<GuideForm, "steps", "id">;
  idx: number;
  register: UseFormRegister<GuideForm>;
  removeStep: UseFieldArrayRemove;
  setValue: UseFormSetValue<GuideForm>;
  control: Control<GuideForm>;
};

const Steps = ({
  step,
  idx,
  removeStep,
  register,
  control,
  setValue,
}: StepProps) => {
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: `steps.${idx}.images` as const,
  });

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
    <div className="border p-4 rounded mb-4">
      <h3 className="font-semibold mb-2">Step {idx + 1}</h3>

      <Input
        defaultValue={step.title}
        {...register(`steps.${idx}.title`)}
        placeholder="Step description..."
        className="mb-2"
      />
      <Textarea
        {...register(`steps.${idx}.bodyMarkdown`)}
        placeholder="Step description"
        defaultValue={step.bodyMarkdown}
      />

      <StepImage
        imageFields={imageFields}
        handleFileChange={handleFileChange}
        previews={previews}
        removeImage={removeImage}
        idx={idx}
        register={register}
        control={control}
      />

      <Button
        type="button"
        onClick={() =>
          appendImage({
            url: "",
            file: undefined,
            caption: "",
            alt: "",
            // thumbnailUrl: "",
            hotspotAnnotations: [],
          })
        }
      >
        Add Image
      </Button>

      <Button
        type="button"
        variant="destructive"
        onClick={() => removeStep(idx)}
      >
        Delete Step
      </Button>
    </div>
  );
};

export default Steps;
