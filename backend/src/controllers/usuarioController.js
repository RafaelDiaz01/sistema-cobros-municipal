import Usuario from "../models/UsuarioModel.js"

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearUsuario = async (req, res) => {
    try {
        const usuarios = await Usuario.create();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};