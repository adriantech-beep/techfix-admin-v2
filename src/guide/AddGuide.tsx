import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
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

  return (
    //TODO: mismatch on typescript
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DeviceInfo />
        <SummaryInfo />
        <ToolsSelector />
        <PartsSelector />
        <Steps />

        <Button type="submit">Create Guide</Button>
      </form>
    </FormProvider>
  );
};

export default AddGuide;
