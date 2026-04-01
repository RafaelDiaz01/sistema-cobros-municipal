import sequelize from "../config/database.js";
import BaseCatastral from "../models/BaseCatastral.js";
import Contribuyente from "../models/Contribuyente.js";

// Función para generar una clave única para la base catastral
const generarClaveBaseCatastral = async (id_contribuyente, claveContribuyente) => {
    // Contar cuantas bases catastrales tiene el contribuyente
    const totalBases = await BaseCatastral.count({ where: { id_contribuyente } });

    // Generar un número secuencial basado en el total de bases catastrales
    const secuencial = String(totalBases + 1).padStart(2, "0"); // "001"

    const claveBaseCatastral = `BCT${secuencial}-${claveContribuyente}`;

    return claveBaseCatastral;
};

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
    const contribuyente = await Contribuyente.findByPk(data.id_contribuyente);
    if (!contribuyente) {
        throw new Error("Contribuyente no encontrado");
    }

    const transaction = await sequelize.transaction();
    try {
        // Generar la clave única para la base catastral
        const claveBaseCatastral = await generarClaveBaseCatastral(contribuyente.id_contribuyente, contribuyente.clave_unica);
        data.cuenta = claveBaseCatastral;

        // Crear la base catastral
        const nuevaBaseCatastral = await BaseCatastral.create(data, { transaction });
        await transaction.commit();
        return nuevaBaseCatastral;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
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