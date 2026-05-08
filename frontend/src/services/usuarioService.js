import api from "../api/axios.js";

// Obtener todos los usuarios
export const getUsuariosAPI = async () => {
    const response = await api.get("/usuarios");
    return response.data;
};

// Crear un usuario
export const createUsuarioAPI = async (data) => {
    const response = await api.post("/usuarios", data);
    return response.data;
};

// Actualizar un usuario
export const updateUsuarioAPI = async (id, data) => {
    const response = await api.put(`/usuarios/${id}`, data);
    return response.data;
};

// Actualizar estado de un usuario
export const updateUsuarioEstadoAPI = async (id, estado) => {
    const response = await api.patch(`/usuarios/${id}/estado`, estado);
    return response.data;
};