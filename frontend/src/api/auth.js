import api from "./axios";

export const loginAPI = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
