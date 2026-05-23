import axiosClient from "./axiosClient";
import {
  isHrInternMockEnabled,
  uploadMockDocument,
  getMockDocumentsByInternId,
} from "../mocks/hrInternMock";

export const documentApi = {
  uploadDocument: (formData) => {
    if (isHrInternMockEnabled) {
      return Promise.resolve(uploadMockDocument(formData));
    }
    return axiosClient.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getDocumentsByInternId: (internId) => {
    if (isHrInternMockEnabled) {
      return Promise.resolve(getMockDocumentsByInternId(internId));
    }
    return axiosClient.get(`/interns/${internId}/documents`);
  },

  getDocumentsByInternProfileId: (internProfileId) => {
    if (isHrInternMockEnabled) {
      return Promise.resolve(getMockDocumentsByInternId(internProfileId));
    }
    return axiosClient.get(`/interns/${internProfileId}/documents`);
  },
};
