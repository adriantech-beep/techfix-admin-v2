import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { addGuideSchema, type AddGuideForm } from "./guideSchema";
import { useCreateGuide } from "./useCreateGuide";
import { processSteps } from "./useProcessStep";
import DeviceInfo from "./DeviceInfo";
import SummaryInfo from "./SummaryInfo";
import ToolsSelector from "./ToolsSelector";
import PartsSelector from "./PartsSelector";
import Steps from "./Steps-v2";

const AddGuide = () => {
  const { mutate: createGuide } = useCreateGuide();
  const form = useForm<AddGuideForm>({
    resolver: zodResolver(addGuideSchema),
    defaultValues: {
      _id: "",
      title: "",
      deviceType: "",
      brand: "",
      model: "",
      summary: "",
      estimatedTimeMinutes: undefined,
      author: "",
      difficulty: undefined,
      tools: [],
      parts: [],
      steps: [],
    },
  });
  const { handleSubmit, reset, formState } = form;

  const onSubmit: SubmitHandler<AddGuideForm> = async (values) => {
    const processedSteps = await processSteps(values.steps);

    const payload = {
      ...values,
      steps: processedSteps,
    };

    createGuide(payload);
    reset();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DeviceInfo />
        <SummaryInfo />
        <ToolsSelector />
        <PartsSelector />
        <Steps />

        <Button
          className="rounded-full"
          type="submit"
          disabled={!formState.isValid}
        >
          Create Guide
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddGuide;
