import Usuario from "../models/Usuario.js";
import { hashPassword } from "../utils/password.js";

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  return await Usuario.findAll();
};

// Crear un nuevo usuario
export const crearUsuario = async (data) => {

  const nuevoUsuario = await Usuario.create({
    nombre_usuario: data.nombre_usuario,
    password_usuario: await hashPassword(data.password_usuario),
  });

  return nuevoUsuario;
};
