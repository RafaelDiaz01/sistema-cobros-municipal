import { Scale, AlertTriangle, CheckCircle2, Printer } from "lucide-react";
import { useForm } from "react-hook-form";

export default function CajaCierreCard({ totalEfectivo, onCerrarCaja }) {
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      saldo_real: "",
      observaciones: "",
    },
  });

  const saldoReal = watch("saldo_real");
  const diferencia =
    saldoReal !== "" ? Number(saldoReal || 0) - totalEfectivo : 0;

  const onSubmit = (data) => {
    onCerrarCaja?.(data);
    console.log("CIERRE DE CAJA:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl border border-[var(--color-borde)] shadow-sm overflow-hidden"
    >
      {/* HEADER */}
      <div className="bg-[var(--color-terciario)] px-6 py-4 border-b border-[var(--color-borde)]">
        <div className="flex items-center gap-2">
          <Scale className="text-[var(--color-primario)]" size={20} />
          <h3 className="text-lg font-bold text-[var(--color-texto)]">
            Cuadre de Caja y Cierre
          </h3>
        </div>
      </div>

      {/* BODY */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* IZQUIERDA */}
        <div className="flex flex-col gap-6">
          {/* INPUTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* EFECTIVO SISTEMA */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold opacity-60">
                Efectivo Sistema
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-[var(--color-primario)]">
                  $
                </span>
                <input
                  readOnly
                  value={
                    Number.isFinite(Number(totalEfectivo))
                      ? Number(totalEfectivo).toFixed(2)
                      : "0.00"
                  }
                  className="
                    w-full h-11 pl-7
                    bg-[var(--color-fondo)]
                    border border-[var(--color-borde)]
                    rounded-lg
                    font-black text-lg
                    text-[var(--color-texto)]
                  "
                />
              </div>
            </div>

            {/* EFECTIVO FÍSICO */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold opacity-60">
                Efectivo Contado (Físico)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-[var(--color-acento)]">
                  $
                </span>
                <input
                  placeholder="0.00"
                  {...register("saldo_real", {
                    required: true,
                    min: 0,
                  })}
                  className="
                    w-full h-11 pl-7
                    bg-white
                    border border-[var(--color-borde)]
                    rounded-lg
                    font-black text-lg
                    outline-none
                    focus:border-[var(--color-acento)]
                  "
                />
              </div>
            </div>
          </div>

          {/* DIFERENCIA */}
          <div className="bg-[var(--color-fondo)] p-4 rounded-lg border border-[var(--color-borde)] flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[var(--color-texto)]">
                Diferencia Final:
              </p>
              <p className="text-[10px] text-gray-500 italic">
                Balance entre sistema y físico
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-2xl font-black ${
                  diferencia < 0
                    ? "text-red-500"
                    : diferencia > 0
                      ? "text-yellow-500"
                      : "text-green-600"
                }`}
              >
                ${diferencia.toLocaleString()}
              </span>
              {diferencia !== 0 && (
                <AlertTriangle
                  size={20}
                  className={
                    diferencia < 0 ? "text-red-500" : "text-yellow-500"
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* DERECHA */}
        <div className="flex flex-col gap-4">
          {/* OBSERVACIONES */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold opacity-70 ml-1">
              Observaciones de Cierre
            </label>
            <textarea
              rows={3}
              {...register("observaciones")}
              placeholder="Escriba aquí cualquier detalle sobre faltantes, sobrantes o incidentes del turno"
              className="
                w-full rounded-xl
                border border-[var(--color-borde)]
                bg-white
                text-sm
                p-3
                outline-none
                focus:border-[var(--color-acento)]
                focus:ring-1
                focus:ring-[var(--color-acento)]
              "
            />
          </div>

          {/* BOTONES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="submit"
              className="
                w-full py-3.5
                bg-[var(--color-acento)]
                text-white
                font-black text-sm
                rounded-xl
                shadow-lg
                hover:scale-[1.01]
                transition
                flex items-center justify-center gap-2
              "
            >
              <CheckCircle2 size={18} />
              FINALIZAR Y CERRAR CAJA
            </button>

            <button
              type="button"
              className="
                w-full py-3
                border border-[var(--color-borde)]
                text-[var(--color-primario)]
                font-bold text-sm
                rounded-xl
                hover:bg-[var(--color-terciario)]
                transition
                flex items-center justify-center gap-2
              "
            >
              <Printer size={18} />
              Imprimir Resumen
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
