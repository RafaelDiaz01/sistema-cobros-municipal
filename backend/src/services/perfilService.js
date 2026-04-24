import Usuario from "../models/Usuario.js";

export const obtenerPerfil = async (id_usuario) => {
    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    return usuario;
};

export const actualizarPerfil = async (id_usuario, data) => {
    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    await usuario.update(data);

    return usuario;
};

// Función para guardar la foto de perfil
export const guardarFotoPerfil = async (id_usuario, foto_perfil) => {
    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    return await usuario.update({ foto_perfil: foto_perfil });
};