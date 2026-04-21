import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EjercicioFiscal = sequelize.define(
    "ejercicio_fiscal",
    {
        id_ejercicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        anio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        proyeccion_ingreso: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
        },
        ingreso_recaudado: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    }
);

export default EjercicioFiscal;