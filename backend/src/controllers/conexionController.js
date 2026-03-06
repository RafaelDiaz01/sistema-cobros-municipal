import * as conexionController from "../services/conexionService.js";

// Obtener todas las conexiones
export const obtenerConexiones = async (req, res) => {
    try {
        const conexiones = await conexionController.obtenerConexiones();
        res.json(conexiones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener conexiones" });
    }
};

// Crear una nueva conexión
export const crearConexion = async (req, res) => {
    try {
        const conexion = await conexionController.crearConexion(req.body);
        res.status(201).json(conexion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear la conexión" });
    }
};

// Actualizar el estado de una conexión
export const putConexionEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const conexionActual = await conexionController.actualizarEstadoConexion(id, estado);

        res.json({
            message: "Estado de la conexión actualizado correctamente",
            conexion: conexionActual,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al actualizar estado de la conexión",
            error: error.message,
        });
    }
};

// Actualizar datos de una conexión
export const putConexion = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const conexionActualizada = await conexionController.actualizarConexion(id, datosActualizados);

        res.json({
            message: "Conexión actualizada correctamente",
            conexion: conexionActualizada,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al actualizar la conexión",
            error: error.message,
        });
    }
};     