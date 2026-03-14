import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PeriodoServicio = sequelize.define(
    "periodo_servicio",
    {
        id_periodo_servicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        id_conexion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        anio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },

        estado: {
            type: DataTypes.ENUM("ADEUDO", "PAGADO", "CONDONADO"),
            defaultValue: "ADEUDO",
        },

        fecha_pago: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default PeriodoServicio;
