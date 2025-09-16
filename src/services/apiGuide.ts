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

export const createGuide = async (guide: GuideForm): Promise<GuideForm> => {
  const { data } = await axiosInstance.post("/api/guides", guide);
  return data;
};

// services/apiGuide.ts
export const deleteGuide = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete(`/api/guides/${id}`);
  return data;
};
