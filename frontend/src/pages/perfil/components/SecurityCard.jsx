import { ChevronRight, Lock } from "lucide-react";
import Stack from "../../../components/layouts/Stack.jsx";
import CardCobro from "../../../components/cards/CardCobro.jsx";

export default function SecurityCard({ onChange }) {
    return (
        <CardCobro title="Seguridad de la Cuenta">
            <Stack size="sm">
                <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3.5 border border-slate-100">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center shadow-xs">
                            <Lock size={14} className="text-slate-500" strokeWidth={2.2} />
                        </span>
                        <div>
                            <p className="text-[13px] font-semibold text-slate-700">
                                Contraseña
                            </p>
                            <p className="text-[13px] text-slate-400 tracking-[0.3em] mt-0.5 leading-none">
                                ••••••••••
                            </p>
                        </div>
                    </div>
                    <button className="flex items-center gap-1 text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer" onClick={onChange}>
                        Cambiar Contraseña
                        <ChevronRight size={14} strokeWidth={2.5} />
                    </button>
                </div>
            </Stack>
        </CardCobro>
    )
}