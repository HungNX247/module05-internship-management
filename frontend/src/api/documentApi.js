import axiosClient from "./axiosClient";
import {
  isHrInternMockEnabled,
  uploadMockDocument,
  getMockDocumentsByInternId,
  throwMockApiErrorIfConfigured,
} from "../mocks/hrInternMock";

function useMock(mockFn, apiFn) {
  throwMockApiErrorIfConfigured();
  if (isHrInternMockEnabled) {
    return mockFn();
  }
  return apiFn();
}

export const documentApi = {
  uploadDocument: (formData) =>
    useMock(
      () => uploadMockDocument(formData),
      () =>
        axiosClient.post("/documents/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
    ),

  getDocumentsByInternId: (internId) =>
    useMock(
      () => getMockDocumentsByInternId(internId),
      () => axiosClient.get(`/interns/${internId}/documents`)
    ),

  getDocumentsByInternProfileId: (internProfileId) =>
    useMock(
      () => getMockDocumentsByInternId(internProfileId),
      () => axiosClient.get(`/interns/${internProfileId}/documents`)
    ),
};
