import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Establecimiento = sequelize.define("establecimiento", {
  id_estableciemiento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_contribuyente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "contribuyentes", // nombre de la tabla padre
      key: "id_contribuyente",
    },
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  calle: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  numero_calle: {
    type: DataTypes.STRING(20),
  },
  barrio: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  fecha_apertura: {
    type: DataTypes.DATEONLY
  },
  giro: {
    type: DataTypes.STRING(50)
  }
});

export default Establecimiento;
