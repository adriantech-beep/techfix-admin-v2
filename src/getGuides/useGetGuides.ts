import { useQuery } from "@tanstack/react-query";
import type { GuideForm } from "@/guide/guideSchema";
import { getGuides } from "@/services/apiGuide";

export const useGetGuides = () => {
  const { data: guides = [], isLoading } = useQuery<GuideForm[]>({
    queryKey: ["guides"],
    queryFn: getGuides,
  });

  return { guides, isLoading };
};
