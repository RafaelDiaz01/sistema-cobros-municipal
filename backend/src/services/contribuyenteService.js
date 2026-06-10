import Contribuyente from "../models/Contribuyente.js";
import sequelize from "../config/database.js";
import { Op, fn, col, where } from "sequelize";
import { isValidFilter } from "../utils/isValidFilter.js";

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
export const obtenerContribuyentes = async (
  page = 1,
  limit = 10,
  search = "",
  activo,
  sortField = "id_contribuyente",
  sortOrder = "DESC",
) => {
  const MAX_LIMIT = 100;

  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), MAX_LIMIT);
  const offset = (pageNumber - 1) * limitNumber;
  const where = {};

  if (isValidFilter(activo)) {
    where.activo = activo === "true";
  }

  if (isValidFilter(search)) {
    const searchTerm = search.trim();
    const isClaveUnica = /^[0-9]+$/.test(searchTerm);

    if (isClaveUnica) {
      where.clave_unica = searchTerm;
    } else {
      const terms = searchTerm.split(/\s+/);

      where[Op.and] = terms.map((term) => ({
        [Op.or]: [
          { nombre: { [Op.like]: `${term}%` } },
          { apellido_paterno: { [Op.like]: `${term}%` } },
          { apellido_materno: { [Op.like]: `${term}%` } },
        ],
      }));
    }
  }

  const { rows, count } =
    await Contribuyente.findAndCountAll({
      where,
      limit: limitNumber,
      offset: offset,
      order: [[sortField, sortOrder]],
    });

  return {
    total: count,
    currentPage: pageNumber,
    totalPages: Math.ceil(count / limitNumber),
    contribuyentes: rows,
  };
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

// Obtener estadísticas de contribuyentes
export const obtenerEstadisticasContribuyentes = async () => {
  const stats = await Contribuyente.findOne({
    attributes: [
      [
        sequelize.fn("COUNT", sequelize.col("*")),
        "total",
      ],

      [
        sequelize.literal("SUM(activo = 1)"),
        "activos",
      ],

      [
        sequelize.literal("SUM(activo = 0)"),
        "inactivos",
      ],

      [
        sequelize.literal("SUM(rfc IS NOT NULL)"),
        "con_rfc",
      ],
    ],
    raw: true,
  });

  return {
    total: Number(stats.total),
    activos: Number(stats.activos),
    inactivos: Number(stats.inactivos),
    con_rfc: Number(stats.con_rfc),
  };
};