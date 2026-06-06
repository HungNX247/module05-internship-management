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
        message: "Đăng nhập thành công (mock)",
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
        message: "Lấy thông tin người dùng hiện tại thành công (mock)",
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
        message: "Đăng xuất thành công (mock)",
      });
    }
    return axiosClient.post("/auth/logout");
  },
};
