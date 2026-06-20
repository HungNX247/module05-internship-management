import axiosClient from "./axiosClient";

export const programAssignmentApi = {
  getAssignments: (programId) =>
    axiosClient.get(`/programs/${programId}/assignments`),

  assignInterns: (programId, internProfileIds) =>
    axiosClient.post(`/programs/${programId}/assign-interns`, {
      internProfileIds,
    }),
};
