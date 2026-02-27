import * as reciboService from "../services/reciboService.js";

// Crear recibo a partir de un pago
export const crearReciboDesdePago = async (req, res) => {
    try {
        const { id_pago } = req.params;
        const recibo = await reciboService.crearReciboDesdePago(id_pago);

        res.status(201).json({
            message: "Recibo generado correctamente",
            recibo,
        });

    } catch (error) {
        console.error("Error al generar recibo:", error.message);
        res.status(400).json({
            message: error.message || "No se pudo generar el recibo",
        });
    }
};

// Obtener historial de recibos
export const obtenerHistorialRecibos = async (req, res) => {
    try {
        const recibos = await reciboService.obtenerHistorialRecibos();
        res.json(recibos);

    } catch (error) {
        console.error("Error al obtener historial:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

// Cancelar recibo
export const cancelarRecibo = async (req, res) => {
    try {
        const { id_recibo } = req.params;
        const { motivo } = req.body;
        const id_usuario = req.user.id_usuario; // viene del JWT

        if (!motivo) {
            return res.status(400).json({
                message: "Debe indicar el motivo de cancelación",
            });
        }

        const recibo = await reciboService.cancelarRecibo(
            id_recibo,
            motivo,
            id_usuario
        );

        res.json({
            message: "Recibo cancelado correctamente",
            recibo,
        });

    } catch (error) {
        console.error("Error al cancelar recibo:", error.message);
        res.status(400).json({
            message: error.message || "No se pudo cancelar el recibo",
        });
    }
};