import axiosClient from "./axiosClient";
import {
  filterMockInterns,
  getMockInternById,
  getMockMyProfile,
  createMockMyProfile,
  updateMockMyProfile,
  submitMockMyProfile,
  isHrInternMockEnabled,
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
  getMyProfile: () =>
    useMock(getMockMyProfile, () => axiosClient.get("/interns/me")),

  createProfile: (data) =>
    useMock(() => createMockMyProfile(data), () => axiosClient.post("/interns", data)),

  updateProfile: (id, data) =>
    useMock(
      () => updateMockMyProfile(id, data),
      () => axiosClient.put(`/interns/${id}`, data)
    ),

  submitProfile: (id) =>
    useMock(
      () => submitMockMyProfile(id),
      () => axiosClient.patch(`/interns/${id}/submit`)
    ),

  getProfileDetail: (id) =>
    useMock(() => getMockInternById(id), () => axiosClient.get(`/interns/${id}`)),

  getInterns: (params) =>
    useMock(
      () => filterMockInterns(params),
      () => axiosClient.get("/interns", { params })
    ),

  getInternById: (id) =>
    useMock(() => getMockInternById(id), () => axiosClient.get(`/interns/${id}`)),
};
