import api from "./axios.js";

// Obtener todos los contribuyentes
export const getContribuyentes = async () => {
  const response = await api.get("/contribuyentes");
  return response.data;
};

// Obtener estadísticas de contribuyentes. Eliminar, ya no sirve
export const getEstadisticasContribuyentes = async () => {
  const response = await api.get("/contribuyentes/estadisticas");
  return response.data;
};

// Crear un nuevo contribuyente
export const createContribuyenteAPI = async (data) => {
  const response = await api.post("/contribuyentes", data);
  return response.data;
};

// Actualizar un contribuyente existente
export const updateStatusContribuyenteAPI = async (id, data) => {
  const response = await api.put(`/contribuyentes/${id}/estado`, data);
  return response.data;
};
