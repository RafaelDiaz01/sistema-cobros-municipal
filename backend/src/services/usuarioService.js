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
    nombre_completo: data.nombre_completo,
  });

  return nuevoUsuario;
};

// Actualizar los datos de un usuario existente
export const actualizarUsuario = async (id, data) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  await usuario.update(data);
  return usuario;
};

// Actualizar el estado de un usuario
export const actualizarUsuarioEstado = async (id, estado) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  usuario.activo = estado;
  await usuario.save();
  return usuario;
};
