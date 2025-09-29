import type { AddGuideForm } from "@/guide/guideSchema";
import axiosInstance from "./axiosInstance";

export const getGuides = async (search?: string) => {
  const res = await axiosInstance.get("/api/guides/get-guides", {
    params: search ? { search } : undefined,
  });
  return res.data;
};

export const createGuide = async (
  guide: AddGuideForm
): Promise<AddGuideForm> => {
  const { data } = await axiosInstance.post("/api/guides", guide);
  return data;
};

export const deleteGuide = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete(`/api/guides/${id}`);
  return data;
};

export const updateGuide = async (
  id: string,
  guide: Partial<AddGuideForm>
): Promise<AddGuideForm> => {
  const { data } = await axiosInstance.put(`/api/guides/${id}`, guide);
  return data;
};
