import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Usuario = sequelize.define("usuario", {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_usuario: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password_usuario:{
    type: DataTypes.STRING,
    allowNull: false
  },
  rol_usuario: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "Administrador"
  },
  ultimo_acceso: {
    type: DataTypes.DATE
  },
  foto_perfil: {
    type: DataTypes.TEXT // Guarda la ubicación de la foto de perfil.
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Activo por defecto
  }
});

export default Usuario;