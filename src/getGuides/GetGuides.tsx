import Skeleton from "@/components/Skeleton";
import { useGetGuides } from "./useGetGuides";
import GuideList from "./GuideList";
import type { AddGuideForm } from "@/guide/guideSchema";

const GetGuides = ({ search }: { search: string }) => {
  const { data: guides, isPending } = useGetGuides(search);

  return (
    <div className="flex flex-col">
      <div className="mt-4">
        {isPending ? (
          <div>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <div className=" h-full flex flex-col gap-2">
            {guides?.map((guide: AddGuideForm, index: number) => (
              <GuideList key={index} guide={guide} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetGuides;
