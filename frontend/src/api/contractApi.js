import axiosClient from "./axiosClient";

export const contractApi = {
  uploadContract: (formData) =>
    axiosClient.post("/contracts/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getContractByInternProfileId: (internProfileId) =>
    axiosClient.get(`/contracts/interns/${internProfileId}`),

  getMyContract: () => axiosClient.get("/contracts/me"),

  confirmContract: (contractId) =>
    axiosClient.patch(`/contracts/${contractId}/confirm`),

  getDownloadUrl: (contractId) => `/api/contracts/${contractId}/download`,
};
