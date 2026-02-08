import { loginAPI, logoutAPI } from "../api/auth.js";

export const login = async (credentials) => {
  return await loginAPI(credentials);
};

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh");
  return response.data;
};

export const logout = async () => {
  return await logoutAPI();
};
