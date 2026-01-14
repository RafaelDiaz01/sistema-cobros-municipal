import api from "./axios";

export const loginAPI = async (credentials) => {
  const response = await api.post("/usuarios/login", credentials);
  return response.data;
};
