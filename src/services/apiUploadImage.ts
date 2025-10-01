import axiosInstance from "./axiosInstance";

type FileProps = {
  file: File;
  guideId: string;
};

export const uploadImage = async ({ file, guideId }: FileProps) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("guideId", guideId);

  const { data } = await axiosInstance.post("/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!data?.url) {
    throw new Error("Image upload failed");
  }

  return data.url;
};
