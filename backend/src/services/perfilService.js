import Usuario from "../models/Usuario.js";

export const obtenerPerfil = async (id_usuario) => {
    const usuario = await Usuario.findByPk(id_usuario, {
        attributes: [
            "id_usuario",
            "nombre_usuario",
            "nombre_completo",
            "rol_usuario",
            "ultimo_acceso",
            "foto_perfil",
            "activo",
            "telefono",
            "departamento",
            "createdAt",
            "updatedAt",
        ],
    });

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

    await usuario.update({
        nombre_usuario: data.nombre_usuario,
        nombre_completo: data.nombre_completo,
        telefono: data.telefono,
        foto_perfil: data.foto_perfil,
        departamento: data.departamento,
    });

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