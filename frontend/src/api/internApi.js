import axiosClient from "./axiosClient";
import {
  isHrInternMockEnabled,
  getMockMyProfile,
  createMockIntern,
  updateMockIntern,
  submitMockIntern,
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
  getMyProfile: () =>
    useMock(getMockMyProfile, () => axiosClient.get("/interns/me")),

  createProfile: (data) =>
    useMock(
      () => createMockIntern(data),
      () => axiosClient.post("/interns", data)
    ),

  updateProfile: (id, data) =>
    useMock(
      () => updateMockIntern(id, data),
      () => axiosClient.put(`/interns/${id}`, data)
    ),

  submitProfile: (id) =>
    useMock(
      () => submitMockIntern(id),
      () => axiosClient.patch(`/interns/${id}/submit`)
    ),

  getProfileDetail: (id) =>
    useMock(
      () => getMockInternById(id),
      () => axiosClient.get(`/interns/${id}`)
    ),

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
