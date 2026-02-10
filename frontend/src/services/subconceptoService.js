import api from "../api/axios.js";

// Obtener todas los subconceptos
export const getSubconceptosAPI = async () => {
  const response = await api.get("/subconceptos");
  return response.data;
};