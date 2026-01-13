import Contribuyente from "../models/ContribuyenteModel.js";

// Obtener todos los contribuyentes
export const obtenerContribuyentes = async () => {
  return await Contribuyente.findAll();
};

// Crear un nuevo contribuyente
export const crearContribuyente = async (data) => {
  // Validación nombre y apellido obligatorios
  if (!data.nombre || !data.apellido_paterno) {
    throw new Error("El nombre y el apellido paterno son obligatorios");
  }

  // Validación de negocio (ejemplo: RFC único)
  if (data.rfc) {
    const existe = await Contribuyente.findOne({
      where: { rfc: data.rfc },
    });

    if (existe) {
      throw new Error("Ya existe un contribuyente con ese RFC");
    }
  }

  // Crear contribuyente
  const nuevoContribuyente = await Contribuyente.create({
    nombre: data.nombre,
    apellido_paterno: data.apellido_paterno,
    apellido_materno: data.apellido_materno,
    fecha_nacimiento: data.fecha_nacimiento,
    telefono: data.telefono,
    calle: data.calle,
    numero_calle: data.numero_calle,
    barrio: data.barrio,
    rfc: data.rfc,
    copia_credencial: data.copia_credencial,
    activo: data.activo ?? true,
  });

  return nuevoContribuyente;
};

// Actualizar el estado de un contribuyente
export const actualizarEstadoContribuyente = async (id, estado) => {
  const contribuyente = await Contribuyente.findByPk(id);

  if (!contribuyente) {
    throw new Error("Contribuyente no encontrado");
  }

  contribuyente.activo = estado;
  await contribuyente.save();

  return contribuyente;
};

// Actualizar los datos de un contribuyente
export const actualizarContribuyente = async (id, data) => {
  const contribuyente = await Contribuyente.findByPk(id);

  if (!contribuyente) {
    throw new Error("Contribuyente no encontrado");
  }

  await contribuyente.update(data); 
  return contribuyente;
}