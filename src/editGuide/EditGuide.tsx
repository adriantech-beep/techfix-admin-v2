import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

import { guideSchema, type GuideForm } from "@/guide/guideSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeviceInfo from "@/guide/DeviceInfo";
import SummaryInfo from "@/guide/SummaryInfo";
import ToolsSelector from "@/guide/ToolsSelector";
import PartsSelector from "@/guide/PartsSelector";
import Steps from "@/guide/Steps-v2";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useUpdateGuide } from "./useUpdateGuide";

const EditGuide = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const guide = state?.guide as GuideForm;
  const { brand, model, title } = guide;

  console.log(guide);

  const form = useForm<GuideForm>({
    resolver: zodResolver(guideSchema),
    defaultValues: guide,
  });

  const { handleSubmit } = form;
  const { mutate: updateGuide, isPending } = useUpdateGuide();

  const onSubmit = (data: Partial<GuideForm>) => {
    if (!guide?.id) return;
    updateGuide(
      { id: guide.id, data },
      {
        onSuccess: () => {
          navigate(`/view-guide`, { state: { guide: data } });
        },
      }
    );
  };

  if (!guide) {
    return (
      <p className="text-center text-muted-foreground">No guide to edit.</p>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="h-[600px]">
            <CarouselItem>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>
                    Edit details for {brand} {model} {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-6 overflow-y-auto">
                  <DeviceInfo />
                  <SummaryInfo />
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Tools Required</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <ToolsSelector />
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Parts Required</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <PartsSelector />
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Steps</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <Steps />
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </Carousel>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditGuide;
