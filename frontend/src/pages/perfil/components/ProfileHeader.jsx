import { Briefcase, CheckCircle2, LogOut, UserPen } from "lucide-react";
import Stack from "../../../components/layouts/Stack.jsx";
import CardCobro from "../../../components/cards/CardCobro.jsx";

const URL = "http://localhost:4000";

export default function ProfileHeader({ user, onEdit }) {
    return (
        <CardCobro title="Perfil de Usuario">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                {/* Avatar */}
                <div className="relative w-20 h-20 flex-shrink-0">
                    <img
                        src={URL + user.foto_perfil}
                        alt={user.nombre_usuario}
                        className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md"
                    />
                </div>

                {/* Nombre */}
                <div className="flex-1 min-w-0">
                    <Stack size="xs">
                        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-tight">
                            {user.nombre_usuario}
                        </h1>

                        <div className="flex items-center gap-1.5">
                            <Briefcase size={15} className="text-[var(--color-primario)]" strokeWidth={2.5} />
                            <span className="text-[15px] font-semibold text-[var(--color-primario)]">
                                {user.rol_usuario}
                            </span>
                        </div>
                    </Stack>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:items-end gap-2">
                    <Stack size="sm">
                        <Button icon={UserPen} variante="primary" onClick={() => onEdit(user)}>
                            Editar Perfil
                        </Button>
                        <Button icon={LogOut} variante="cancel">
                            Cerrar Sesión
                        </Button>
                    </Stack>
                </div>
            </div>
        </CardCobro>
    )
}

const Button = ({ children, variante = "primary", icon: Icon, onClick }) => {
    const styles = {
        primary:
            "bg-[var(--color-primario)] hover:bg-[var(--color-acento)] text-white shadow-sm shadow-emerald-100",
        cancel:
            "bg-white hover:bg-red-50 text-red-500 border border-red-200 hover:border-red-300",
    };
    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${styles[variante]}`}
        >
            {Icon && <Icon size={15} strokeWidth={2.2} />}
            {children}
        </button>
    );
};