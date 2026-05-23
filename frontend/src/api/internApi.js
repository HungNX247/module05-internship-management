import axiosClient from "./axiosClient";

export const internApi = {
  createProfile: (data) => axiosClient.post("/interns", data),

  updateProfile: (id, data) => axiosClient.put(`/interns/${id}`, data),

  getProfileDetail: (id) => axiosClient.get(`/interns/${id}`),

  getInterns: (params) => axiosClient.get("/interns", { params }),

  getInternById: (id) => axiosClient.get(`/interns/${id}`),
};
