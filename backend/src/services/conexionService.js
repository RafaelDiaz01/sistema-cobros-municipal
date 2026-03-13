import Conexion from "../models/Conexion.js";
import Contribuyente from "../models/Contribuyente.js";

// Función para generar una clave única para la cuenta de la conexión
const generarClaveCuenta = async (id_contribuyente, claveContribuyente) => {

    // Contar cuantas conexiones tiene el contribuyente
    const totalConexiones = await Conexion.count({ where: { id_contribuyente } });

    // Generar un número secuencial basado en el total de conexiones
    const secuencial = String(totalConexiones + 1).padStart(2, "0"); // "001"

    const claveConexion = `CNX${secuencial}-${claveContribuyente}`;

    return claveConexion;
};

// Obtener todas las conexiones
export const obtenerConexiones = async () => {
    return await Conexion.findAll({
        include: [
            {
                model: Contribuyente,
                as: "contribuyente",
                attributes: ["id_contribuyente", "nombre", "apellido_paterno", "apellido_materno"],
            },
        ],
    });
};

// Crear una nueva conexión
export const crearConexion = async (data) => {
    const contribuyente = await Contribuyente.findByPk(data.id_contribuyente);
    if (!contribuyente) {
        throw new Error("Contribuyente no encontrado");
    }

    // Generar la clave de cuenta única para la conexión
    const claveCuenta = await generarClaveCuenta(contribuyente.id_contribuyente, contribuyente.clave_unica);
    data.cuenta = claveCuenta;

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