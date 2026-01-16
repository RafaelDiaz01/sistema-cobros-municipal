import api from "./axios.js";

// Obtener todos los establecimientos
export const getEstablecimientos = async () => {
  const response = await api.get("/establecimientos");
  return response.data;
};

// Actualizar el estado (activo/inactivo) de un establecimiento
export const updateStatusEstablecimientoAPI = async (id, data) => {
  const response = await api.put(`/establecimientos/${id}/estado`, data);
  return response.data;
};