import api from "../api/axios.js";

// Obtener todas las secciones
export const getSeccionesAPI = async () => {
  const response = await api.get("/secciones");
  return response.data;
};