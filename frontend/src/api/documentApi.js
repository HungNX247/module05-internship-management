import axiosClient from "./axiosClient";

export const documentApi = {
  uploadDocument: (formData) =>
    axiosClient.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getDocumentsByInternId: (internId) =>
    axiosClient.get(`/interns/${internId}/documents`),
};
