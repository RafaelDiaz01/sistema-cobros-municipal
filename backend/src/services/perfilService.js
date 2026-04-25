import Usuario from "../models/Usuario.js";
import { hashPassword, comparePassword } from "../utils/password.js";

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

// Función para cambiar la contraseña
export const cambiarContrasena = async (id_usuario, password_usuario, password_nueva) => {
    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    // Verificar que la contraseña actual sea correcta
    const passwordOk = await comparePassword(password_usuario, usuario.password_usuario);
    if (!passwordOk) {
        throw new Error("La contraseña actual es incorrecta");
    }

    // Verificar que la nueva contraseña no sea igual a la actual
    const passwordIgual = await comparePassword(password_nueva, usuario.password_usuario);
    if (passwordIgual) {
        throw new Error("La nueva contraseña no puede ser igual a la actual");
    }

    // Hashear la nueva contraseña
    const passwordHash = await hashPassword(password_nueva);
    await usuario.update({ password_usuario: passwordHash });
    
    return usuario;
};