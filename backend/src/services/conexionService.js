import sequelize from "../config/database.js";
import Conexion from "../models/Conexion.js";
import Contribuyente from "../models/Contribuyente.js";
import PeriodoServicio from "../models/PeriodoServicio.js";

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

    const transaction = await sequelize.transaction();
    try {
        // Generar la clave de cuenta única para la conexión
        const claveCuenta = await generarClaveCuenta(contribuyente.id_contribuyente, contribuyente.clave_unica);
        data.cuenta = claveCuenta;

        // Crear la conexión
        const nuevaConexion = await Conexion.create(data, { transaction });
        const id_conexion = nuevaConexion.id_conexion;

        // Obtener año de creación de la conexión
        const fechaCreacion = new Date(nuevaConexion.fecha_conexion);
        const anioCreacion = fechaCreacion.getFullYear();

        // Obtener año actual
        const anioActual = new Date().getFullYear();

        // Crear lista de periodos
        const periodos = [];
        for (let anio = anioCreacion; anio <= anioActual; anio++) {
            periodos.push({
                id_conexion,
                anio,
                estado: "ADEUDO",
            });
        }

        // Insertar periodos en la base de datos
        await PeriodoServicio.bulkCreate(periodos, { transaction });

        await transaction.commit();

        return nuevaConexion;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
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

// Obtener el estado de adeudo de una conexión
export const obtenerEstadoConexion = async (id_conexion) => {
    const conexion = await Conexion.findByPk(id_conexion);
    if (!conexion) {
        throw new Error("Conexión no encontrada");
    }

    const periodos = await PeriodoServicio.findAll({
        where: { id_conexion },
        order: [["anio", "ASC"]],
    });

    const adeudos = periodos.filter((periodo) => periodo.estado === "ADEUDO");

    return {
        total_periodos: periodos.length,
        total_adeudos: adeudos.length,
        estado: adeudos.length > 0 ? "ADEUDO" : "AL CORRIENTE",
        anios_adeudo: adeudos.map((adeudo) => adeudo.anio),
    };
};