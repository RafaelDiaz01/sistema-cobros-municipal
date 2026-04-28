import { loginAPI, logoutAPI } from "../api/auth.js";

export const login = async (credentials) => {
  return await loginAPI(credentials);
};

export const logout = async () => {
  return await logoutAPI();
};
