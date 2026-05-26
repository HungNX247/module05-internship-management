/**
 * ⚠️ Technical debt:
 * Hiện token và currentUser được lưu trong localStorage để phục vụ demo MVP.
 * Production cần chuyển sang HttpOnly cookie + refresh token để giảm rủi ro XSS.
 * Tracking: backlog SECURITY-001
 */

const TOKEN_KEY = "accessToken";
const USER_KEY = "currentUser";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function saveCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getCurrentUser() {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    removeCurrentUser();
    return null;
  }
}

export function removeCurrentUser() {
  localStorage.removeItem(USER_KEY);
}

export function clearAuthData() {
  removeToken();
  removeCurrentUser();
}

export function isAuthenticated() {
  return Boolean(getToken());
}

/** Chỉ dùng khi VITE_HR_INTERN_MOCK=true — test UI HR không cần backend auth */
export function ensureDevHrAuthForMock() {
  if (import.meta.env.VITE_HR_INTERN_MOCK !== "true") {
    return;
  }

  const user = getCurrentUser();
  if (isAuthenticated() && user?.role) {
    return;
  }

  saveToken("mock-dev-hr-token");
  saveCurrentUser({
    id: 1,
    fullName: "HR Test User",
    email: "hr@gmail.com",
    role: "HR",
  });
}

export function getCurrentRole() {
  const user = getCurrentUser();
  return user?.role || null;
}
