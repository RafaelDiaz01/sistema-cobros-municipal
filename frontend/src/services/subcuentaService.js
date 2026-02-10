import api from "../api/axios.js";

// Obtener todas las subcuentas
export const getSubcuentasAPI = async () => {
  const response = await api.get("/subcuentas");
  return response.data;
};