import api from "./axios.js";

// Crear un nuevo establecimiento
export const createEstablecimientoAPI = async (data) => {
  const response = await api.post("/establecimientos", data);
  return response.data;
};

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

// Actualizar los datos de un establecimiento
export const updateEstablecimientoAPI = async (id, data) => {
  const response = await api.put(`/establecimientos/${id}`, data);
  return response.data;
};