import * as UsuarioService from "../services/usuarioService.js";

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioService.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await UsuarioService.crearUsuario(req.body);
    res.json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para el login de usuarios
export const login = async (req, res) => {
  try {
    const { nombre_usuario, password_usuario } = req.body;

    if (!nombre_usuario || !password_usuario) {
      return res.status(400).json({
        message: "Usuario y contraseña son obligatorios",
      });
    }

    const data = await UsuarioService.loginService(nombre_usuario, password_usuario);

    res.json({
      message: "Login exitoso",
      ...data,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
