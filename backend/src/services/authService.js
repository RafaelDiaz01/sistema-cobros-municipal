import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import RefreshToken from "../models/RefreshToken.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

// Función para iniciar sesión
export const loginService = async (nombre_usuario, password_usuario) => {
  const usuario = await Usuario.findOne({
    where: { nombre_usuario },
  });

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const passwordHashed = await hashPassword(password_usuario);
  const passwordOk = await comparePassword(password_usuario, passwordHashed);

  if (!passwordOk) {
    throw new Error("Credenciales incorrectas");
  }

  const payload = {
    id_usuario: usuario.id_usuario,
    rol_usuario: usuario.rol_usuario
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await RefreshToken.create({
    token: refreshToken,
    id_usuario: usuario.id_usuario,
    expiracion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
};

// Función para refrescar el token de acceso
export const refreshAccessTokenService = async (refreshToken) => {
  const tokenDB = await RefreshToken.findOne({
    where: { token: refreshToken },
  });

  if (!tokenDB) {
    throw new Error("Refresh token inválido");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new Error("Refresh token expirado");
  }

  const usuario = await Usuario.findByPk(decoded.id_usuario);

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  if (!usuario.activo) {
    throw new Error("Usuario inactivo");
  }

  const newAccessToken = generateAccessToken({
    id_usuario: usuario.id_usuario,
    rol_usuario: usuario.rol_usuario
  });

  return newAccessToken;
};

// Función para cerrar sesión
export const logoutService = async (refreshToken) => {
  if (!refreshToken) return;

  await RefreshToken.destroy({
    where: { token: refreshToken },
  });
};
