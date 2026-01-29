import api from "./axios.js";

// Obtener datos de el corte activo de un usuario
export const getCorteActivoAPI = async (id_usuario) => {
  const response = await api.get(`/corte-caja/activo/${id_usuario}`);
  return response.data;
};

// Obtener pagos por corte de caja
export const getPagosPorCorteAPI = async (id_corte) => {
  const response = await api.get(`/pagos/corte/${id_corte}`);
  return response.data;
};