import api from "../api/axios.js";

// Obtener todas las cuentas contables
export const getCuentasAPI = async () => {
  const response = await api.get("/cuentas");
  return response.data;
};
