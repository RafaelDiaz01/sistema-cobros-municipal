import api from "../api/axios.js";

// Obtener todas los recibos
export const getRecibosAPI = async () => {
  const response = await api.get("/recibos");
  return response.data;
};

// Cancelar recibo
export const cancelarReciboAPI = async (id_recibo, motivo) => {
  const response = await api.patch(`/recibos/${id_recibo}/cancelar`, { motivo });
  return response.data;
};