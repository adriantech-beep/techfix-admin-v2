import type { AddGuideForm } from "@/guide/guideSchema";
import CustomNavigationMenu from "./CustomNavigation";

interface GuideListProps {
  guide: AddGuideForm;
}

const GuideList = ({ guide }: GuideListProps) => {
  if (!guide)
    return <p className="font-large text-gray-700">No guides to show</p>;
  return <CustomNavigationMenu guide={guide} />;
};

export default GuideList;
