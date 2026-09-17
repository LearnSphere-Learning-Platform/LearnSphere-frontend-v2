// Authentication service - talks to the real Oauth (LEARNSPHERE) backend.
import { authApi } from "./api";

// Decode the JWT payload without any library (base64url decode)
function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function getStoredToken() {
  const token = localStorage.getItem("jwtToken");
  if (!token) return null;
  const claims = decodeJwt(token);
  if (!claims) return null;
  // token expired -> treat as logged out
  if (claims.exp && claims.exp * 1000 < Date.now()) {
    logout();
    return null;
  }
  return token;
}

export function getRole() {
  const token = getStoredToken();
  if (!token) return null;
  const claims = decodeJwt(token);
  if (!claims) return null;
  if (claims.role) return claims.role;
  if (claims.isInstructor === true) return "INSTRUCTOR";
  return "STUDENT";
}

export function getUserEmail() {
  const token = getStoredToken();
  if (!token) return null;
  const claims = decodeJwt(token);
  return claims ? claims.sub : null;
}

// Login with email + password. Stores the token and basic user info.
export async function login(email, password) {
  const response = await authApi.post("/api/learnsphere/auth/login", { email, password });
  const token = response.token;

  localStorage.setItem("jwtToken", token);
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("userEmail", email);

  // fetch the full user record for id and name
  const user = await authApi.get(`/api/learnsphere/auth/user/email/${encodeURIComponent(email)}`);
  localStorage.setItem("userId", String(user.id));
  localStorage.setItem("username", user.fullName);
  localStorage.setItem("user", JSON.stringify(user));

  const claims = decodeJwt(token) || {};
  localStorage.setItem("isInstructor", String(claims.isInstructor === true));

  if (user.isAdmin || claims.role === "ADMIN") {
    localStorage.setItem("isAdmin", "true");
  } else {
    localStorage.removeItem("isAdmin");
  }

  // instructors also need their instructorId
  if (claims.isInstructor === true) {
    try {
      const instructorInfo = await authApi.get(`/api/instructor/user/${user.id}`);
      localStorage.setItem("instructorId", String(instructorInfo.instructorId));
      localStorage.setItem("instructorData", JSON.stringify(instructorInfo.instructor || user));
    } catch (e) {
      console.warn("Could not fetch instructor profile", e);
    }
  } else {
    localStorage.removeItem("instructorData");
    localStorage.removeItem("instructorId");
  }

  return { token, user, claims };
}

export async function signup(fullName, email, password, isInstructor) {
  const path = isInstructor
    ? "/api/learnsphere/auth/create-instructor"
    : "/api/learnsphere/auth/create-user";
  const created = await authApi.post(path, { fullName, email, password, isInstructor });
  return created;
}

export async function forgotPassword(email) {
  return authApi.post("/api/learnsphere/auth/forgot-password", { email });
}

export async function resetPassword(token, newPassword, confirmPassword) {
  return authApi.post(
    `/api/learnsphere/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(
      newPassword
    )}&confirmPassword=${encodeURIComponent(confirmPassword)}`
  );
}

// Clear the session locally and blacklist the token on the server
export async function logout() {
  const token = localStorage.getItem("jwtToken");
  try {
    if (token) {
      await fetch(`${import.meta.env.VITE_AUTH_API_URL}/api/learnsphere/users/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    // ignore network errors on logout - still clear locally
  }
  [
    "jwtToken",
    "isAuthenticated",
    "userEmail",
    "userId",
    "username",
    "user",
    "isInstructor",
    "isAdmin",
    "instructorData",
    "instructorId",
    "adminToken",
    "admin_mock_token",
  ].forEach((key) => localStorage.removeItem(key));
}
