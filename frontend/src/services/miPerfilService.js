import api from "../api/axios.js";

// Obtener información del perfil
export const getPerfilAPI = async () => {
    const response = await api.get("/mi-perfil");
    return response.data;
};

// Actualizar información del perfil
export const updatePerfilAPI = async (data) => {
    const response = await api.put("/mi-perfil", data);
    return response.data;
};