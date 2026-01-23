import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Seccion = sequelize.define("seccion", {
  id_seccion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clave_seccion: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  es_cobrable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  monto_base: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Seccion;
