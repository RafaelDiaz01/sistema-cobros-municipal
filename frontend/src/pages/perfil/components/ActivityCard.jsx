import { Clock, LogIn, User } from "lucide-react";
import Stack from "../../../components/layouts/Stack.jsx";
import CardCobro from "../../../components/cards/CardCobro.jsx";

export default function ActivityCard({ user }) {
    return (
        <CardCobro title="Resumen de Actividad">
            <div className="flex flex-col gap-8">
                <ActivityItem
                    icon={LogIn}
                    iconBg="bg-emerald-50 text-emerald-600"
                    label="Último Inicio de Sesión"
                    title={"18 de Abril, 2026 - 3:45 PM"}
                    subtitle={"Hace 2 días"}
                />
                <div className="border-t border-slate-100" />
                <ActivityItem
                    icon={Clock}
                    iconBg="bg-blue-50 text-blue-500"
                    label="Turno Actual"
                    title={"9:00 AM - 5:00 PM"}
                    subtitle={"Matutino"}
                />
                <div className="border-t border-slate-100" />
                <ActivityItem
                    icon={User}
                    iconBg="bg-yellow-50 text-yellow-600"
                    label="Activo Desde"
                    title={"23 de Junio, 2024"}
                    subtitle="Hace 3 meses"
                />
            </div>
        </CardCobro>
    )
}

const ActivityItem = ({ icon: Icon, iconBg, label, title, subtitle }) => (
    <div className="flex items-start gap-3">
        <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}
        >
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