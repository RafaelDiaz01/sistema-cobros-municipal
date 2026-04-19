import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Alquiler = sequelize.define(
    "alquiler",
    {
        id_alquiler: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_contribuyente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        periodicidad: {
            type: DataTypes.ENUM("Por hora", "Por viaje", "Por Kilometro", "Por día"),
            allowNull: false,
        },
        tarifa_base: {
            type: DataTypes.DECIMAL(12, 2), // Ejemplo 9999999999.99
            allowNull: false,
        },
        monto_total: {
            type: DataTypes.DECIMAL(12, 2), // Ejemplo 9999999999.99
            allowNull: false,
        },
        fecha_inicio: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATEONLY,
        },
        descripcion: {
            type: DataTypes.TEXT,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    },
);

export default Alquiler;