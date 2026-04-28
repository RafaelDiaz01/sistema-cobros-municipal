import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const requestUrl = originalRequest?.url ?? "";

    // No intentar refrescar sesión en las rutas de autenticación.
    if (
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    // Si no hay response → error de red
    if (!error.response) {
      return Promise.reject(error);
    }

    // Si NO es 401 → error normal
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Evitar loop infinito
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // Manejo de múltiples requests al mismo tiempo
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await axios.post(
        "http://localhost:4000/api/auth/refresh",
        {},
        { withCredentials: true },
      );
      processQueue(null);
      return api(originalRequest);
    } catch (err) {
      processQueue(err);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
