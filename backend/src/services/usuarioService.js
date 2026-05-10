import Usuario from "../models/Usuario.js";
import { hashPassword } from "../utils/password.js";

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  return await Usuario.findAll();
};

// Crear un nuevo usuario
export const crearUsuario = async (data) => {
  // Generar nombre_usuario y password desde nombre_completo
  const partes = data.nombre_completo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")         // Eliminar diacríticos
    .toLowerCase()
    .trim()
    .split(/\s+/);                           // Separar por espacios

  const primerNombre = partes[0];
  const primerApellido = partes[partes.length >= 4 ? 2 : 1];
  const anioActual = new Date().getFullYear();

  const nombre_usuario = `${primerNombre}.${primerApellido}`;
  const password_generado = `${primerNombre}${primerApellido}${anioActual}`;

  // Crear el nuevo usuario en la base de datos
  const nuevoUsuario = await Usuario.create({
    nombre_usuario: nombre_usuario,
    password_usuario: await hashPassword(password_generado),
    nombre_completo: data.nombre_completo,
    rol_usuario: data.rol_usuario,
    telefono: data.telefono,
    correo: data.correo,
    cargo: data.cargo,
    departamento: data.departamento,
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
