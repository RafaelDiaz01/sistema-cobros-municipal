import api from "./axios.js";

// Buscar conceptos de pago por texto
export const searchConceptoPagoAPI = async (texto) => {
  const response = await api.get("/conceptos/buscar", {
    params: { texto },
  });
  return response.data;
};