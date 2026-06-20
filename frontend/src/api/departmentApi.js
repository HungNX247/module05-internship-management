import axiosClient from "./axiosClient";

export const departmentApi = {
  getDepartments: () => axiosClient.get("/departments"),
  createDepartment: (data) => axiosClient.post("/departments", data),
  updateDepartment: (id, data) => axiosClient.put(`/departments/${id}`, data),
  deleteDepartment: (id) => axiosClient.delete(`/departments/${id}`),
};
