import axiosClient from "./axiosClient";

export const programAssignmentApi = {
  assignInterns: (programId, internProfileIds) =>
    axiosClient.post(`/programs/${programId}/assign-interns`, {
      internProfileIds,
    }),
};
