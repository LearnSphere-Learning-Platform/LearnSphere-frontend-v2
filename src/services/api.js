// Central API helper for all backend calls.
// Attaches the JWT from localStorage to every request and parses the JSON response.

const getToken = () => localStorage.getItem("jwtToken");

async function request(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errorBody = await response.text();
      if (errorBody) {
        message = errorBody;
      }
    } catch (e) {
      // keep default message
    }
    throw new Error(message);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

// Small helpers for the different microservices
export const authApi = {
  get: (path) => request(`${import.meta.env.VITE_AUTH_API_URL}${path}`),
  post: (path, body) => request(`${import.meta.env.VITE_AUTH_API_URL}${path}`, {
    method: "POST",
    body: JSON.stringify(body),
  }),
  put: (path, body) => request(`${import.meta.env.VITE_AUTH_API_URL}${path}`, {
    method: "PUT",
    body: JSON.stringify(body),
  }),
};

export const courseApi = {
  get: (path) => request(`${import.meta.env.VITE_COURSE_API_URL}${path}`),
  post: (path, body) => request(`${import.meta.env.VITE_COURSE_API_URL}${path}`, {
    method: "POST",
    body: JSON.stringify(body),
  }),
  put: (path, body) => request(`${import.meta.env.VITE_COURSE_API_URL}${path}`, {
    method: "PUT",
    body: JSON.stringify(body),
  }),
  patch: (path, body) =>
    request(`${import.meta.env.VITE_COURSE_API_URL}${path}`, {
      method: "PATCH",
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  delete: (path) => request(`${import.meta.env.VITE_COURSE_API_URL}${path}`, { method: "DELETE" }),
};

export const enrollmentApi = {
  get: (path) => request(`${import.meta.env.VITE_ENROLLMENT_API_URL}${path}`),
  post: (path, body) =>
    request(`${import.meta.env.VITE_ENROLLMENT_API_URL}${path}`, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: (path, body) =>
    request(`${import.meta.env.VITE_ENROLLMENT_API_URL}${path}`, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: (path) =>
    request(`${import.meta.env.VITE_ENROLLMENT_API_URL}${path}`, { method: "DELETE" }),
};

export const discussionApi = {
  get: (path) => request(`${import.meta.env.VITE_DISCUSSION_API_URL}${path}`),
  put: (path, body) =>
    request(`${import.meta.env.VITE_DISCUSSION_API_URL}${path}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  post: (path, body) =>
    request(`${import.meta.env.VITE_DISCUSSION_API_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

export const announcementApi = {
  get: (path) => request(`${import.meta.env.VITE_ANNOUNCEMENT_API_URL}${path}`),
  post: (path, body) =>
    request(`${import.meta.env.VITE_ANNOUNCEMENT_API_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (path, body) =>
    request(`${import.meta.env.VITE_ANNOUNCEMENT_API_URL}${path}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: (path) =>
    request(`${import.meta.env.VITE_ANNOUNCEMENT_API_URL}${path}`, { method: "DELETE" }),
};

export const studentApi = {
  get: (path) => request(`${import.meta.env.VITE_STUDENT_API_URL}${path}`),
  post: (path, body) =>
    request(`${import.meta.env.VITE_STUDENT_API_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

// File download helper (used for certificates and CSV exports)
export async function downloadFile(url, filename) {
  const token = getToken();
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}`);
  }
  const blob = await response.blob();
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}

export default request;
