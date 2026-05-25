import axiosClient from "./axiosClient";
import { isHrInternMockEnabled } from "../mocks/hrInternMock";
import { getCurrentUser } from "../services/tokenService";

export const authApi = {
  login: async (credentials) => {
    if (isHrInternMockEnabled) {
      const email = credentials.email.trim();
      let role = "ADMIN";
      let id = 9;
      let fullName = "Mock Admin";

      if (email.includes("hr")) {
        role = "HR";
        id = 1;
        fullName = "Mock HR Manager";
      } else if (email.includes("mentor")) {
        role = "MENTOR";
        id = 2;
        fullName = "Mock Mentor";
      } else if (email.includes("intern")) {
        role = "INTERN";
        id = 10;
        fullName = "Mock Intern";
      }

      return {
        success: true,
        message: "Login successful (mock)",
        data: {
          token: `mock-token-${role.toLowerCase()}`,
          user: {
            id,
            fullName,
            email,
            role,
          },
        },
      };
    }
    const response = await axiosClient.post("/auth/login", credentials);
    return response;
  },

  getCurrentUser: () => {
    if (isHrInternMockEnabled) {
      const user = getCurrentUser();
      return Promise.resolve({
        success: true,
        message: "Get current user successfully (mock)",
        data: user || {
          id: 10,
          fullName: "Mock Intern",
          email: "intern@gmail.com",
          role: "INTERN",
        },
      });
    }
    return axiosClient.get("/auth/me");
  },

  logout: () => {
    if (isHrInternMockEnabled) {
      return Promise.resolve({
        success: true,
        message: "Logout successful (mock)",
      });
    }
    return axiosClient.post("/auth/logout");
  },
};
