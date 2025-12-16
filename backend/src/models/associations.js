import Contribuyente from "./ContribuyenteModel.js";
import Establecimiento from "./EstablecimientoModel.js";
import BaseCatastral from "./BaseCatastralModel.js";
import Conexion from "./ConexionModel.js";

// =============================
// RELACIÓN CONTRIBUYENTE - ESTABLECIMIENTOS
// =============================

// Un Contribuyente tiene muchos Establecimientos
Contribuyente.hasMany(Establecimiento, {
  foreignKey: "id_contribuyente",
  as: "establecimientos",
});

// Un Establecimiento pertenece a un Contribuyente
Establecimiento.belongsTo(Contribuyente, {
  foreignKey: "id_contribuyente",
  as: "contribuyente",
});

// =============================
// RELACIÓN CONTRIBUYENTE - BASES CATASTRALES
// =============================

// Un Contribuyente tiene muchas Bases Catastrales
Contribuyente.hasMany(BaseCatastral, {
  foreignKey: "id_contribuyente",
  as: "bases_catastrales"
});

// Una Base Catastral pertenece a un Contribuyente
BaseCatastral.belongsTo(Contribuyente, {
  foreignKey: "id_contribuyente",
  as: "contribuyente",
});

// =============================
// RELACIÓN CONTRIBUYENTE - CONEXIONES
// =============================

// Un contribuyente tiene muchas Conexiones
Contribuyente.hasMany(Conexion, {
  foreignKey: "id_contribuyente",
  as: "conexiones"
});

// Una conexión pertenece a un Contribuyente
Conexion.belongsTo(Contribuyente, {
  foreignKey: "id_contribuyente",
  as: "contribuyente"
});

export { Contribuyente, Establecimiento, BaseCatastral, Conexion };
