import Contribuyente from "../models/Contribuyente.js";
import { Op, fn, col, where } from "sequelize";

// Función para generar una clave única para el contribuyente
const generarClaveContribuyente = () => {
  const year = new Date().getFullYear().toString().slice(-2); // "24"
  const random = Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase(); // X9P2

  return `CTR-${year}-${random}`;
};

// Obtener todos los contribuyentes
export const obtenerContribuyentes = async () => {
  return await Contribuyente.findAll();
};

// Crear un nuevo contribuyente
export const crearContribuyente = async (data) => {
  let claveGenerada;
  let existe = true;

  // Bucle para evitar colisiones
  while (existe) {
    claveGenerada = generarClaveContribuyente();
    existe = await Contribuyente.findOne({
      where: { clave_unica: claveGenerada },
    });
  }

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
    clave_unica: claveGenerada,
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

// Buscar contribuyentes por nombre
export const buscarContribuyentesPorNombre = async (search) => {
  return await Contribuyente.findAll({
    attributes: [
      "id_contribuyente",
      "clave_unica",
      "nombre",
      "apellido_paterno",
      "apellido_materno",
      "rfc",
      "calle",
      "numero_calle",
      "barrio"
    ],
    where: where(
      fn(
        "CONCAT",
        col("nombre"),
        " ",
        col("apellido_paterno"),
        " ",
        col("apellido_materno")
      ),
      {
        [Op.like]: `%${search}%`
      }
    ),
    limit: 10
  });
};