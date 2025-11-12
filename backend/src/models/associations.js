import Contribuyente from "./ContribuyenteModel.js";
import Establecimiento from "./EstablecimientoModel.js";

// Associations

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

export { Contribuyente, Establecimiento };
