import Recibo from "../models/Recibo.js";
import Pago from "../models/Pago.js";
import Contribuyente from "../models/Contribuyente.js";
import sequelize from "../config/database.js";

// Crear recibo a partir de un pago
export const crearReciboDesdePago = async (id_pago) => {
    const t = await sequelize.transaction();
    try {
        const pago = await Pago.findByPk(id_pago, { transaction: t });
        if (!pago) {
            throw new Error("Pago no encontrado");
        }

        if (pago.estado === "CANCELADO") {
            throw new Error("No se puede generar recibo de un pago cancelado");
        }

        const recibo = await Recibo.create(
            {
                id_pago,
                folio: pago.folio,
                estado: "EMITIDO",
            },
            { transaction: t }
        );

        await t.commit();
        return recibo;

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

// Obtener historial de recibos
export const obtenerHistorialRecibos = async () => {
    return await Recibo.findAll({
        include: [
            {
                model: Pago,
                as: "pago",
                include: [
                    {
                        model: Contribuyente,
                        as: "contribuyente",
                        attributes: ["id_contribuyente", "nombre"],
                    },
                ],
            },
        ],
        order: [["fecha_emision", "DESC"]],
    });
};

// Cancelar recibo
export const cancelarRecibo = async (id_recibo, motivo, id_usuario) => {
    const t = await sequelize.transaction();

    try {
        const recibo = await Recibo.findByPk(id_recibo, {
            include: {
                model: Pago,
                as: "pago",
            },
            transaction: t,
        });

        if (!recibo) {
            throw new Error("Recibo no encontrado");
        }

        if (recibo.estado === "CANCELADO") {
            throw new Error("El recibo ya está cancelado");
        }

        // Cancelar recibo
        recibo.estado = "CANCELADO";
        recibo.motivo_cancelacion = motivo;
        recibo.cancelado_por = id_usuario;
        recibo.fecha_cancelacion = new Date();
        await recibo.save({ transaction: t });

        // Cancelar pago asociado
        if (recibo.pago) {
            recibo.pago.estado = "CANCELADO";
            await recibo.pago.save({ transaction: t });
        }

        await t.commit();
        return recibo;

    } catch (error) {
        await t.rollback();
        throw error;
    }
};