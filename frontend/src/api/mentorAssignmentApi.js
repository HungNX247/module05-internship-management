import axiosClient from "./axiosClient";

export const mentorAssignmentApi = {
  assignMentor: (internProfileId, mentorId) =>
    axiosClient.patch(`/hr/mentors/assign/${internProfileId}`, { mentorId }),
};
