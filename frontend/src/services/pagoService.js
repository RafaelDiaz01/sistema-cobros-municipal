import api from "../api/axios.js";

export const descargarReciboPDF = async (idPago) => {
  const response = await api.get(`/pagos/${idPago}/recibo`, {
    responseType: "blob",
  });
  return response.data;
};
