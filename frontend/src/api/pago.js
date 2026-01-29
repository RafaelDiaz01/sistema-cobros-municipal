import api from "./axios.js";

// Crear un nuevo pago
export const createPagoAPI = async (data) => {
  const response = await api.post("/pagos", data);
  return response.data;
};

// Obtener todos los pagos
export const getPagosAPI = async () => {
  const response = await api.get("/pagos");
  return response.data;
};
