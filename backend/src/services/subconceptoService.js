import Subconcepto from "../models/Subconcepto.js";
import sequelize from "../config/database.js";
import { Op, fn, col, where } from "sequelize";

// Obtener todos los subconceptos
export const getAllSubconceptos = async (
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;
    const { rows, count } = await Subconcepto.findAndCountAll({
      limit,
      offset,
      order: [["id_subconcepto", "ASC"]],
    });

    return {
      data: rows,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    console.error("Error al obtener los subconceptos:", error);
    throw error;
  }
};

// Crear un nuevo subconcepto
export const createSubconcepto = async (data) => {
  try {
    const subconcepto = await Subconcepto.create(data);
    return subconcepto;
  } catch (error) {
    console.error("Error al crear el subconcepto:", error);
    throw error;
  }
};

// Actualizar un subconcepto existente
export const updateSubconcepto = async (id, data) => {
  try {
    const subconcepto = await Subconcepto.findByPk(id);
    if (!subconcepto) throw new Error("Subconcepto no encontrado");
    await subconcepto.update(data);
    return subconcepto;
  } catch (error) {
    console.error("Error al actualizar el subconcepto:", error);
    throw error;
  }
};

// Actualizar estado de un subconcepto
export const updateSubconceptoEstado = async (id, estado) => {
  try {
    const subconcepto = await Subconcepto.findByPk(id);
    if (!subconcepto) throw new Error("Subconcepto no encontrado");
    subconcepto.activo = estado;
    await subconcepto.save();
    return subconcepto;
  } catch (error) {
    console.error("Error al actualizar el estado del subconcepto:", error);
    throw error;
  }
};

// Obtener estadisticas de subconceptos
export const getSubconceptoStats = async () => {
  try {
    const stats = await Subconcepto.findOne({
      attributes: [
        [
          sequelize.fn("COUNT", sequelize.col("*")),
          "total"
        ],
        [
          sequelize.literal("SUM(activo = 1)"),
          "activos"
        ],
        [
          sequelize.literal("SUM(activo = 0)"),
          "inactivos"
        ],
        [
          sequelize.literal("SUM(es_cobrable = 1)"),
          "cobrables"
        ]
      ],
      raw: true
    });

    return {
      total: Number(stats.total),
      activos: Number(stats.activos),
      inactivos: Number(stats.inactivos),
      cobrables: Number(stats.cobrables)
    };
  } catch (error) {
    console.error("Error al obtener las estadísticas de subconceptos:", error);
    throw error;
  }
}

