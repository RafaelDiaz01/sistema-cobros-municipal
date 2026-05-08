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

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioActualizado = await UsuarioService.actualizarUsuario(id, req.body);
    res.json({
      message: "Usuario actualizado correctamente",
      usuario: usuarioActualizado
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarUsuarioEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const usuarioActualizado = await UsuarioService.actualizarUsuarioEstado(id, estado);
    res.json({
      message: "Estado del usuario actualizado correctamente",
      usuario: usuarioActualizado
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


