import axiosClient from "./axiosClient";

export const scheduleApi = {
  getMySchedule: () => axiosClient.get("/interns/me/schedule"),
};
