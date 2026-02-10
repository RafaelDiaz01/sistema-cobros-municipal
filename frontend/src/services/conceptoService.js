import api from "../api/axios.js";

// Obtener todas los conceptos
export const getConceptosAPI = async () => {
  const response = await api.get("/conceptos");
  return response.data;
};