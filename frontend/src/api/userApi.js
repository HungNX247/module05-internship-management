import axiosClient from "./axiosClient";

export const userApi = {
  getUsers: (params) => axiosClient.get("/admin/users", { params }),
  getUserById: (id) => axiosClient.get(`/admin/users/${id}`),
  createUser: (data) => axiosClient.post("/admin/users", data),
  updateUser: (id, data) => axiosClient.put(`/admin/users/${id}`, data),
  updateUserStatus: (id, status) =>
    axiosClient.patch(`/admin/users/${id}/status`, { status }),
};
