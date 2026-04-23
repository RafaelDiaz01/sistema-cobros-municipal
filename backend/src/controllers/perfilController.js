import * as perfilService from "../services/perfilService.js";

export const getPerfil = async (req, res) => {
    try {
        const usuario = await perfilService.obtenerPerfil(req.user.id_usuario);
        res.json(usuario);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const putPerfil = async (req, res) => {
    try {
        const usuarioActualizado = await perfilService.actualizarPerfil(
            req.user.id_usuario,
            req.body
        );

        res.json({
            usuario: usuarioActualizado,
            message: "Perfil actualizado correctamente",
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Subir foto de perfil
export const uploadFotoPerfil = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se ha subido ningún archivo" });
        }

        const foto_perfil = `/uploads/${req.file.filename}`;
        await perfilService.guardarFotoPerfil(req.user.id_usuario, foto_perfil);
        res.json({ message: "Foto de perfil actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};