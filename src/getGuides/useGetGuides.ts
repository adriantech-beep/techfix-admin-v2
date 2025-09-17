import { useQuery } from "@tanstack/react-query";
// import type { GuideForm } from "@/guide/guideSchema";
import { getGuides } from "@/services/apiGuide";

// export const useGetGuides = () => {
//   const { data: guides = [], isPending } = useQuery<GuideForm[]>({
//     queryKey: ["guides"],
//     queryFn: getGuides,
//   });

//   return { guides, isPending };
// };
export const useGetGuides = (search: string) => {
  return useQuery({
    queryKey: ["guides", search],
    queryFn: () => getGuides(search),
    enabled: search.length > 0 || true, // always true, but you could gate here
  });
};
