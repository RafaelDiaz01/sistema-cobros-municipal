import { User } from "lucide-react";
import CardCobro from "../../components/cards/CardCobro";

export default function ContribuyenteCard() {
  return (
    <CardCobro className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <User size={16} className="text-green-600" />
        Contribuyente Seleccionado
      </div>

      <div className="text-sm">
        <p className="font-medium">Juan Carlos Pérez</p>
        <p className="text-xs text-gray-500">RFC: XTS190722DEF</p>
        <p className="text-xs text-gray-500">Clave Catastral: 02-005-0012</p>
        <p className="text-xs text-gray-500 mt-1">
          Av. Juárez 123, Centro, Ixtlán de Juárez, Oax.
        </p>
      </div>
    </CardCobro>
  );
}
