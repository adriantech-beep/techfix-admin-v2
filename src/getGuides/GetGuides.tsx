import Skeleton from "@/components/Skeleton";
import { useGetGuides } from "./useGetGuides";
import GuideList from "./GuideList";

const GetGuides = () => {
  const { guides, isLoading } = useGetGuides();
  console.log(guides);

  return (
    <div className="flex flex-col">
      <div className="mt-4">
        {isLoading ? (
          <div>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <div className=" h-full flex flex-col gap-2">
            {guides?.map((guide) => (
              <GuideList key={guide.id} guide={guide} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetGuides;
