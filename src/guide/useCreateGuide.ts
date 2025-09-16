import { createGuide } from "@/services/apiGuide";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateGuide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGuide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
      toast("Guide has been created", {
        description: Date.now(),
      });
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;

      if (error.response?.status === 422) {
        console.log(error.response.data?.message);
      } else {
        toast("Guide has been created", {
          description: Date.now(),
        });
      }
    },
  });
};
