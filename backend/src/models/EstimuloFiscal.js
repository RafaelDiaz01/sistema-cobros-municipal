import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EstimuloFiscal = sequelize.define("estimulo_fiscal", {
  id_estimulo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  porcentaje_descuento: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  requisitos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  resumen: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default EstimuloFiscal;