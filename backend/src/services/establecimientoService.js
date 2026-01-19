import Establecimiento from "../models/EstablecimientoModel.js";
import Contribuyente from "../models/ContribuyenteModel.js";

// Obtener todos los establecimientos con su contribuyente
export const obtenerEstablecimientos = async () => {
  return await Establecimiento.findAll({
    include: {
      model: Contribuyente,
      as: "contribuyente",
      attributes: ["id_contribuyente", "nombre", "apellido_paterno", "apellido_materno"],
    },
  });
};

// Crear un nuevo establecimiento
export const crearEstablecimiento = async (data) => {
  const nuevoEstablecimiento = await Establecimiento.create(data);
  return nuevoEstablecimiento;
};

// Actualizar el estado de un establecimiento
export const actualizarEstadoEstablecimiento = async (id, estado) => {
  const establecimiento = await Establecimiento.findByPk(id);
  if (!establecimiento) {
    throw new Error("Establecimiento no encontrado");
  }

  establecimiento.activo = estado;
  await establecimiento.save();

  return establecimiento;
};

// Actualizar datos de un establecimiento
export const actualizarEstablecimiento = async (id, datosActualizados) => {
  const establecimiento = await Establecimiento.findByPk(id);
  if (!establecimiento) {
    throw new Error("Establecimiento no encontrado");
  }

  await establecimiento.update(datosActualizados);
  return establecimiento;
};
