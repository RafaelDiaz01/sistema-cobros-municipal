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


