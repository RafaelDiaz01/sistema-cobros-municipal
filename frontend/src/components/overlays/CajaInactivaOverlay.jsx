import { Lock } from "lucide-react";
import Stack from "../layouts/Stack";

export default function CajaInactivaOverlay() {
  return (
    <div className="absolute inset-0 z-10 bg-white/30 backdrop-blur-sm flex items-center justify-center rounded-xl">
      <Stack size="xs" className="items-center text-center">
        <Lock size={40} className="mx-auto text-gray-500" />
        <p className="text-lg text-gray-700 font-medium">
          Cobros Deshabilitados
        </p>
        <p className="text-sm text-gray-500">
          Inicia un turno para continuar
        </p>
      </Stack>
    </div>
  );
}