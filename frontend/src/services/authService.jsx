import { loginAPI } from "../api/auth.js";

export const login = async (credentials) => {
  return await loginAPI(credentials);
};
