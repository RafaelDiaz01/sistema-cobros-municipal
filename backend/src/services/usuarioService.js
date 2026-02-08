import Usuario from "../models/Usuario.js";

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
