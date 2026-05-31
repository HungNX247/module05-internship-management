import axiosClient from "./axiosClient";
import {
  isHrInternMockEnabled,
  getMockInternById,
  filterMockInterns,
  throwMockApiErrorIfConfigured,
} from "../mocks/hrInternMock";

function useMock(mockFn, apiFn) {
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

  submitProfile: (data) => axiosClient.post("/interns/apply", data),

  getProfileDetail: (id) => axiosClient.get(`/interns/${id}`),

  getInterns: (params) =>
    useMock(
      () => filterMockInterns(params),
      () => axiosClient.get("/interns", { params })
    ),

  getInternById: (id) =>
    useMock(
      () => getMockInternById(id),
      () => axiosClient.get(`/interns/${id}`)
    ),
};
