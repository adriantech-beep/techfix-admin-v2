import type { GuideForm } from "@/guide/guideSchema";
import CustomNavigationMenu from "./CustomNavigation";

interface GuideListProps {
  guide: GuideForm;
}

const GuideList = ({ guide }: GuideListProps) => {
  if (!guide) return <p>No guides to show</p>;
  return <CustomNavigationMenu guide={guide} />;
};

export default GuideList;
