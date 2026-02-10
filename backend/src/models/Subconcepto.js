import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Subconcepto = sequelize.define(
  "subconcepto",
  {
    id_subconcepto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clave_subconcepto: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    monto_base: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    periodicidad: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    es_cobrable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

export default Subconcepto;
