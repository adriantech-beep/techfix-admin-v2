// hooks/useDeleteGuide.ts
import { deleteGuide } from "@/services/apiGuide";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useDeleteGuide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGuide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
      toast("Guide successfully deleted");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;

      if (error.response?.status === 422) {
        console.log(error.response.data?.message);
      } else {
        toast("Deleting guide unsuccessfull");
      }
    },
  });
};
