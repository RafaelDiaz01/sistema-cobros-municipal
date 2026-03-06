import Conexion from "../models/Conexion.js";

// Obtener todas las conexiones
export const obtenerConexiones = async () => {
    return await Conexion.findAll();
};

// Crear una nueva conexión
export const crearConexion = async (data) => {
    const nuevaConexion = await Conexion.create(data);
    return nuevaConexion;
};

// Actualizar el estado de una conexión
export const actualizarEstadoConexion = async (id, estado) => {
    const conexion = await Conexion.findByPk(id);
    if (!conexion) {
        throw new Error("Conexión no encontrada");
    }

    conexion.activo = estado;
    await conexion.save();

    return conexion;
};

// Actualizar datos de una conexión
export const actualizarConexion = async (id, datosActualizados) => {
    const conexion = await Conexion.findByPk(id);
    if (!conexion) {
        throw new Error("Conexión no encontrada");
    }

    await conexion.update(datosActualizados);
    return conexion;
};  