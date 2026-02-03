import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Stack from "../../components/layouts/Stack.jsx";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-fondo)] flex items-center justify-center px-4">
      {/* FORMAS DECORATIVAS */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-green-100 rounded-full opacity-60" />
      <div className="absolute bottom-[-220px] right-[-220px] w-[620px] h-[620px] bg-green-200 rounded-full opacity-50" />

      {/* CONTENEDOR */}
      <div className="relative z-10 max-w-lg w-full">
        <div className="p-8 space-y-6 text-center">
          <Stack size="lg">
            {/* 404 */}
            <h1 className="text-7xl font-black text-[var(--color-primario)] tracking-tight">
              404
            </h1>

            {/* Texto */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[var(--color-texto)]">
                Ruta no encontrada
              </h2>
              <p className="text-sm opacity-70">
                La página que intentas acceder no existe, fue eliminada o no
                tienes permiso para verla.
              </p>
            </div>

            {/* ACCIONES */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 flex items-center justify-center gap-2
                         py-3 rounded-xl border border-[var(--color-borde)]
                         font-bold text-sm
                         hover:bg-[var(--color-terciario)]
                         transition"
              >
                <ArrowLeft size={18} />
                Volver
              </button>

              <button
                onClick={() => navigate("/corte-caja")}
                className="flex-1 flex items-center justify-center gap-2
                         py-3 rounded-xl
                         bg-[var(--color-primario)]
                         text-white
                         font-bold text-sm
                         shadow-lg shadow-[var(--color-primario)]/25
                         hover:scale-[1.02]
                         transition"
              >
                <Home size={18} />
                Ir al inicio
              </button>
            </div>
          </Stack>
        </div>

        {/* Footer mini */}
        <p className="text-center text-[10px] uppercase tracking-[3px] opacity-40">
          Tesorería Municipal • Sistema Administrativo
        </p>
      </div>
    </div>
  );
}
