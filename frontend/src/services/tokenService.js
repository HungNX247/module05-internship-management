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
  } catch (error) {
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

export function getCurrentRole() {
  const user = getCurrentUser();
  return user?.role || null;
}
