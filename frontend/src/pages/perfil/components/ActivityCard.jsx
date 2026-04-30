import { Clock, LogIn, User } from "lucide-react";
import Stack from "../../../components/layouts/Stack.jsx";
import CardCobro from "../../../components/cards/CardCobro.jsx";
import timeFormatter from "../../../utils/timeFormatter.js";

export default function ActivityCard({ user }) {
    return (
        <CardCobro title="Resumen de Actividad">
            <div className="flex flex-col gap-8">
                <ActivityItem
                    icon={Clock}
                    label="Turno Actual"
                    title={"9:00 AM - 5:00 PM"}
                    subtitle={"Matutino"}
                />
                <div className="border-t border-slate-100" />
                <ActivityItem
                    icon={LogIn}
                    label="Último Inicio de Sesión"
                    title={timeFormatter(user.ultimo_acceso)}
                    subtitle={"Hace 2 días"}
                />
                <div className="border-t border-slate-100" />
                <ActivityItem
                    icon={User}
                    label="Última Actualización de Perfil"
                    title={timeFormatter(user.updatedAt)}
                    subtitle={"Hace 3 meses"}
                />
            </div>
        </CardCobro>
    )
}

const ActivityItem = ({ icon: Icon, label, title, subtitle }) => (
    <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-50 text-[var(--color-primario)]">
            <Icon size={15} strokeWidth={2.2} />
        </div>
        <div>
            <Stack size="xs">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {label}
                </p>
                <p className="text-sm font-medium">{title}</p>
                {subtitle && (
                    <p className="text-[12px] text-slate-400 font-medium">{subtitle}</p>
                )}
            </Stack>
        </div>
    </div>
);