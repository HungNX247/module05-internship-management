import axiosClient from "./axiosClient";

export const mentorApi = {
  getMentors: (params) => axiosClient.get("/hr/mentors", { params }),
  getMentorById: (id) => axiosClient.get(`/hr/mentors/${id}`),
  createMentor: (data) => axiosClient.post("/hr/mentors", data),
  updateMentor: (id, data) => axiosClient.put(`/hr/mentors/${id}`, data),
  getWorkload: () => axiosClient.get("/hr/mentors/workload"),
  assignMentor: (internProfileId, mentorId) =>
    axiosClient.patch(`/hr/mentors/assign/${internProfileId}`, { mentorId }),
};

export const hrUserApi = {
  getUsers: (params) => axiosClient.get("/hr/users", { params }),
};
