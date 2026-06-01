import axiosClient from "./axiosClient";
import {
  isHrInternMockEnabled,
  getMockInternById,
  filterMockInterns,
  throwMockApiErrorIfConfigured,
} from "../mocks/hrInternMock";

function withMock(mockFn, apiFn) {
  throwMockApiErrorIfConfigured();
  if (isHrInternMockEnabled) {
    return mockFn();
  }
  return apiFn();
}

export const internApi = {
  createProfile: (data) => axiosClient.post("/interns", data),

  getMyProfile: () => axiosClient.get("/interns/me"),

  updateProfile: (id, data) => axiosClient.put(`/interns/${id}`, data),

  submitProfile: (id) => axiosClient.post(`/interns/${id}/submit`),

  approveProfile: (id) => axiosClient.patch(`/interns/${id}/approve`),

  rejectProfile: (id) => axiosClient.patch(`/interns/${id}/reject`),

  getProfileDetail: (id) => axiosClient.get(`/interns/${id}`),

  getInterns: (params) =>
    withMock(
      () => filterMockInterns(params),
      () => axiosClient.get("/interns", { params })
    ),

  getInternById: (id) =>
    withMock(
      () => getMockInternById(id),
      () => axiosClient.get(`/interns/${id}`)
    ),
};
