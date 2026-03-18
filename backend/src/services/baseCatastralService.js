import BaseCatastral from "../models/BaseCatastral.js";
import Contribuyente from "../models/Contribuyente.js";

// Obtener todas las bases catastrales con su contribuyente
export const obtenerBasesCatastrales = async () => {
    return await BaseCatastral.findAll({
        include: {
            model: Contribuyente,
            as: "contribuyente",
            attributes: ["nombre", "apellido_paterno", "apellido_materno"]
        },
    });
};

// Crear una nueva base catastral
export const crearBaseCatastral = async (data) => {
    const nuevaBaseCatastral = await BaseCatastral.create(data);
    return nuevaBaseCatastral;
};

// Actualizar el estado de una base catastral
export const actualizarEstadoBaseCatastral = async (id, estado) => {
    const baseCatastral = await BaseCatastral.findByPk(id);
    if (!baseCatastral) {
        throw new Error("Base catastral no encontrada");
    }

    baseCatastral.activo = estado;
    await baseCatastral.save();

    return baseCatastral;
};

// Actualizar datos de una base catastral
export const actualizarBaseCatastral = async (id, datosActualizados) => {
    const baseCatastral = await BaseCatastral.findByPk(id);
    if (!baseCatastral) {
        throw new Error("Base catastral no encontrada");
    }

    await baseCatastral.update(datosActualizados);
    return baseCatastral;
};