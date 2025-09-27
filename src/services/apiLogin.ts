import axiosInstance from "./axiosInstance";

export const loginUser = async (user: unknown) => {
  const { data } = await axiosInstance.post("/api/auth/user-login", user);

  return data;
};
