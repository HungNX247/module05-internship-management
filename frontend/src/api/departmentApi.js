import axiosClient from "./axiosClient";

export const departmentApi = {
  getDepartments: () => axiosClient.get("/departments"),
};
