import type { EditGuideForm } from "@/guide/guideSchema";
import { updateGuide } from "@/services/apiGuide";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

type UpdateGuidePayload = {
  id: string;
  data: Partial<EditGuideForm>;
};

export const useUpdateGuide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateGuidePayload) => updateGuide(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
      toast.success("Guide has been updated successfully");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;

      if (error.response?.status === 422) {
        console.log(error.response.data?.message);
      } else {
        toast.error("Updating guide unsuccessful");
      }
    },
  });
};
