import api from "./axios.js";

// Buscar estímulos fiscales por texto
export const searchEstimuloFiscalAPI = async (texto) => {
  const response = await api.get("/estimulos/buscar", {
    params: { texto },
  });
  return response.data;
};

// Obtener todos los estímulos fiscales
export const getEstimulosAPI = async () => {
  const response = await api.get("/estimulos");
  return response.data;
};

// Actualizar el estado de un estímulo fiscal
export const updateStatusEstimuloAPI = async (id, nuevoEstado) => {
  await api.patch(`/estimulos/${id}/estado`, { activo: nuevoEstado });
};

// Crear un nuevo estímulo fiscal
export const createEstimuloAPI = async (estimuloData) => {
  const response = await api.post("/estimulos", estimuloData);
  return response.data;
};

// Editar un estímulo fiscal existente
export const editEstimuloAPI = async (id, estimuloData) => {
  const response = await api.put(`/estimulos/${id}`, estimuloData);
  return response.data;
};
