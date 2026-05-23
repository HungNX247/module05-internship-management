import axiosClient from "./axiosClient";
import {
  isHrInternMockEnabled,
  getMockMyProfile,
  createMockIntern,
  updateMockIntern,
  submitMockIntern,
  getMockInternById,
  filterMockInterns,
} from "../mocks/hrInternMock";

export const internApi = {
  createProfile: (data) => {
    if (isHrInternMockEnabled) {
      return Promise.resolve(createMockIntern(data));
    }
    return axiosClient.post("/interns", data);
  },

  updateProfile: (id, data) => {
    if (isHrInternMockEnabled) {
      return Promise.resolve(updateMockIntern(id, data));
    }
    return axiosClient.put(`/interns/${id}`, data);
  },

  getProfileDetail: (id) => {
    if (isHrInternMockEnabled) {
      return Promise.resolve(getMockInternById(id));
    }
    return axiosClient.get(`/interns/${id}`);
  },

  getInterns: (params) => {
    if (isHrInternMockEnabled) {
      return Promise.resolve(filterMockInterns(params));
    }
    return axiosClient.get("/interns", { params });
  },

  getInternById: (id) => {
    if (isHrInternMockEnabled) {
      return Promise.resolve(getMockInternById(id));
    }
    return axiosClient.get(`/interns/${id}`);
  },

  getMyProfile: () => {
    if (isHrInternMockEnabled) {
      return Promise.resolve(getMockMyProfile());
    }
    return axiosClient.get("/interns/me");
  },

  submitProfile: (id) => {
    if (isHrInternMockEnabled) {
      return Promise.resolve(submitMockIntern(id));
    }
    return axiosClient.patch(`/interns/${id}/submit`);
  },
};
