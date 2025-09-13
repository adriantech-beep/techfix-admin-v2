// import {
//   FormProvider,
//   useFieldArray,
//   // useFieldArray,
//   useForm,
//   type SubmitHandler,
// } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { guideSchema, type GuideForm } from "./guideSchema";
// import DeviceInfo from "./DeviceInfo";
// import SummaryInfo from "./SummaryInfo";
// import ToolsSelector from "./ToolsSelector";
// import PartsSelector from "./PartsSelector";
// import Steps from "./Steps-v2";

// const AddGuide = () => {
//   const form = useForm<GuideForm>({
//     resolver: zodResolver(guideSchema),
//     defaultValues: {
//       title: "",
//       deviceType: "",
//       brand: "",
//       model: "",
//       summary: "",
//       estimatedTimeMinutes: undefined,
//       author: "",
//       difficulty: "",
//       tools: [],
//       parts: [],
//       steps: [],
//     },
//   });

//   const debug = form.getValues();
//   console.log(JSON.stringify(debug, null, 2));

//   const onSubmit: SubmitHandler<GuideForm> = (values) => {
//     console.log("Form Submitted:", values);
//     // console.log(values.steps);
//   };

//   const {
//     fields: stepFields,
//     append: createStep,
//     remove: removeStep,
//   } = useFieldArray({
//     control: form.control,
//     name: "steps",
//   });

//   const addStep = () =>
//     createStep({
//       // index: Number(stepFields.length),
//       title: "",
//       bodyMarkdown: "",
//       images: [],
//       actionType: "instruction",
//       // expectedOutcome: "",
//       // warnings: [],
//       // toolsNeeded: [],
//       // partsNeeded: [],
//       // durationMinutes: null,
//       // choices: [],
//     });

//   return (
//     <FormProvider {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <DeviceInfo form={form} />
//         <SummaryInfo form={form} />
//         <ToolsSelector form={form} />
//         <PartsSelector form={form} />
//         {stepFields.map((step, idx) => (
//           <Steps
//             key={step.id}
//             step={step}
//             idx={idx}
//             register={form.register}
//             removeStep={removeStep}
//             setValue={form.setValue}
//           />
//         ))}
//         <div className="flex flex-col gap-4">
//           <Button type="button" onClick={addStep}>
//             Add Step
//           </Button>
//         </div>{" "}
//         *<Button type="submit">Create Guide</Button>
//       </form>
//     </FormProvider>
//   );
// };

// export default AddGuide;


import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { guideSchema, type GuideForm } from "./guideSchema";
import DeviceInfo from "./DeviceInfo";
import SummaryInfo from "./SummaryInfo";
import ToolsSelector from "./ToolsSelector";
import PartsSelector from "./PartsSelector";
import Steps from "./Steps-v2";

const AddGuide = () => {
  const form = useForm<GuideForm>({
    //TODO: mismatch on typescript
    resolver: zodResolver(guideSchema),
    defaultValues: {
      title: "",
      deviceType: "",
      brand: "",
      model: "",
      summary: "",
      estimatedTimeMinutes: undefined,
      author: "",
      difficulty: "",
      tools: [],
      parts: [],
      steps: [],
    },
  });

  const onSubmit: SubmitHandler<GuideForm> = (values) => {
    console.log("Form Submitted:", values);
  };

  const {
    fields: stepFields,
    append: createStep,
    remove: removeStep,
  } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const addStep = () =>
    createStep({
      title: "",
      bodyMarkdown: "",
      images: [],
    });

  return (
    //TODO: mismatch on typescript
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <DeviceInfo form={form} />
      <SummaryInfo form={form} />
      <ToolsSelector form={form} />
      <PartsSelector form={form} />

      {stepFields.map((step, idx) => (
        <Steps
          key={step.id}
          step={step}
          idx={idx}
          register={form.register}
          removeStep={removeStep}
          setValue={form.setValue}
          control={form.control}
        />
      ))}

      <div className="flex flex-col gap-4">
        <Button type="button" onClick={addStep}>
          Add Step
        </Button>
      </div>
      <Button type="submit">Create Guide</Button>
    </form>
  );
};

export default AddGuide;
