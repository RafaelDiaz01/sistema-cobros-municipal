import Usuario from "../models/UsuarioModel.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  return await Usuario.findAll();
};

// Crear un nuevo usuario
export const crearUsuario = async (data) => {
  // Agregar validaciones adicionales si es necesario

  const nuevoUsuario = await Usuario.create({
    nombre_usuario: data.nombre_usuario,
    password_usuario: data.password_usuario,
  });

  return nuevoUsuario;
};

// Función para el login de usuarios
export const loginService = async (usuario, password) => {
  const usuarioEncontrado = await Usuario.findOne({ where: { nombre_usuario: usuario } });

  if (!usuarioEncontrado) {
    throw new Error("Usuario no encontrado");
  }

  if (!usuarioEncontrado.activo) {
    throw new Error("Usuario inactivo");
  }

  const passwordHashed = await hashPassword(password);
  const passwordOk = await comparePassword(usuarioEncontrado.password_usuario, passwordHashed);

  if (!passwordOk) {
    throw new Error("Credenciales incorrectas");
  }

  const token = generateToken({
    id: usuarioEncontrado.id_usuario,
    usuario: usuarioEncontrado.nombre_usuario,
  });

  return {
    usuario: {
      id: usuarioEncontrado.id_usuario,
      usuario: usuarioEncontrado.nombre_usuario,
    },
    token,
  };
};
