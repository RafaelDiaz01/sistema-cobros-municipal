import EjercicioFiscal from "../models/EjercicioFiscal.js";

// Obtener todos los ejercicios fiscales
export const obtenerEjerciciosFiscales = async () => {
    return await EjercicioFiscal.findAll();
};

// Crear un nuevo ejercicio fiscal
export const crearEjercicioFiscal = async (data) => {
    // Validar que no exista el ejercicio fiscal
    const existe = await EjercicioFiscal.findOne({
        where: { anio: data.anio },
    });

    if (existe) {
        throw new Error("Ya existe un ejercicio fiscal con ese año");
    }

    // Crear ejercicio fiscal
    return await EjercicioFiscal.create({
        anio: data.anio,
        descripcion: data.descripcion,
        proyeccion_ingreso: data.proyeccion_ingreso,
        ingreso_recaudado: data.ingreso_recaudado,
        activo: data.activo !== undefined ? data.activo : true,
    });
};