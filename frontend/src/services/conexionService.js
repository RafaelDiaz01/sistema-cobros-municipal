import api from "../api/axios.js";

// Obtener todas los conexiones
export const getConexionesAPI = async () => {
  const response = await api.get("/conexiones");
  return response.data;
};

// Crear una conexión
export const createConexionAPI = async (data) => {
  const response = await api.post("/conexiones", data);
  return response.data;
};

// Actualizar una conexión
export const updateConexionAPI = async (id, data) => {
  const response = await api.patch(`/conexiones/${id}`, data);
  return response.data;
};

// Actualizar estado de una conexión
export const updateConexionEstadoAPI = async (id, estado) => {
  const response = await api.patch(`/conexiones/${id}/estado`, estado);
  return response.data;
};

// Obtener adeudos de una conexión
export const getAdeudosConexionAPI = async (id_conexion) => {
  const response = await api.get(`/conexiones/${id_conexion}/adeudo`);
  return response.data;
};