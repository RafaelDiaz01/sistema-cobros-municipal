import {
    obtenerPerfil,
    actualizarPerfil,
} from "../services/perfilService.js";

export const getPerfil = async (req, res) => {
    try {
        const usuario = await obtenerPerfil(req.user.id_usuario);

        res.json({
            ok: true,
            usuario,
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            message: error.message,
        });
    }
};

export const putPerfil = async (req, res) => {
    try {
        const usuarioActualizado = await actualizarPerfil(
            req.user.id_usuario,
            req.body
        );

        res.json({
            ok: true,
            usuario: usuarioActualizado,
            message: "Perfil actualizado correctamente",
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};