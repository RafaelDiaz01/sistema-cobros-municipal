import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Recibo = sequelize.define("recibo", {
    id_recibo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    id_pago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },

    folio: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    },

    estado: {
        type: DataTypes.ENUM("EMITIDO", "CANCELADO"),
        defaultValue: "EMITIDO",
    },

    fecha_emision: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

    ruta_pdf: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    cancelado_por: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    motivo_cancelacion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    fecha_cancelacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
});

export default Recibo;