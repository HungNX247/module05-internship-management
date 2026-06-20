import axiosClient from "./axiosClient";

export const programApi = {
  getPrograms: (params) => axiosClient.get("/programs", { params }),
  getProgramById: (id) => axiosClient.get(`/programs/${id}`),
  createProgram: (data) => axiosClient.post("/programs", data),
  updateProgram: (id, data) => axiosClient.put(`/programs/${id}`, data),
};
