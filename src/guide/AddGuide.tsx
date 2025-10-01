import {
  FormProvider,
  useForm,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { guideSchema, type GuideForm } from "./guideSchema";
import { useCreateGuide } from "./useCreateGuide";
import { processSteps } from "./useProcessStep";
import DeviceInfo from "./DeviceInfo";
import SummaryInfo from "./SummaryInfo";
import ToolsSelector from "./ToolsSelector";
import PartsSelector from "./PartsSelector";
import Steps from "./Steps-v2";
import Symptom from "./Symptom";
import { processSymptom } from "./useProcessSymptom";
import { slugify } from "@/helper/slugify";

const AddGuide = () => {
  const { mutate: createGuide } = useCreateGuide();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolver = zodResolver(guideSchema) as unknown as Resolver<any, any>;
  const form = useForm<GuideForm>({
    resolver,
    defaultValues: {
      title: "",
      deviceType: "",
      brand: "",
      model: "",
      summary: "",
      estimatedTimeMinutes: undefined,
      difficulty: "Easy",
      author: "",
      symptom: { description: "", images: [] },
      tools: [],
      parts: [],
      steps: [],
    },
  });
  const { handleSubmit, reset, formState } = form;

  const onSubmit: SubmitHandler<GuideForm> = async (values) => {
    const guideSlug = slugify(values.title);
    const processedSteps = await processSteps(values.steps, guideSlug);
    const processedSymptom = await processSymptom(values.symptom, guideSlug);
    const payload = {
      ...values,
      steps: processedSteps,
      symptom: processedSymptom,
    };

    createGuide(payload);
    reset();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DeviceInfo />
        <SummaryInfo />
        <Symptom />
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
