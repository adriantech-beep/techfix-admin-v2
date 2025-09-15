import type { GuideForm } from "@/guide/guideSchema";
import axiosInstance from "./axiosInstance";

export const getGuides = async (): Promise<GuideForm[]> => {
  try {
    const { data } = await axiosInstance.get("/api/guides/get-guides");
    return data.guides as GuideForm[];
  } catch (err) {
    console.error("Failed to fetch guides:", err);
    return [];
  }
};
