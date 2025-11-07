import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Contribuyente = sequelize.define("Contribuyente", {
  id_contribuyente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  apellido_paterno: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  apellido_materno: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY, // DATEONLY es solo para fecha sin hora.
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING(15), // String por si el usuario ingresa 951-580-12-24
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Activo por defecto
  },
});

export default Contribuyente;
