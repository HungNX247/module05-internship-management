import axiosClient from "./axiosClient";

export const authApi = {
  login: async (credentials) => {
    const response = await axiosClient.post("/auth/login", credentials);
    return response;
  },
  getCurrentUser: () => axiosClient.get("/auth/me"),
  logout: () => axiosClient.post("/auth/logout"),
};
