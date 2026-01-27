import api from "./axios.js";

// Buscar estímulos fiscales por texto
export const searchEstimuloFiscalAPI = async (texto) => {
  const response = await api.get("/estimulos/buscar", {
    params: { texto },
  });
  return response.data;
};