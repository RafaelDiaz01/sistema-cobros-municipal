import { getInitials } from "../../utils/getInitials.js";

export default function UserAvatar({ nombre_usuario, size = 40, className = "", }) {
    const initials = getInitials(nombre_usuario);
    const tamañoTexto = size * 0.4;
    
    return (
        <div
            className={`rounded-full flex items-center justify-center bg-[var(--color-primario)] text-white font-semibold select-none ${className}`}
            style={{
                width: size,
                height: size,
                fontSize: `${tamañoTexto}px`,
            }}
        >
            {initials}
        </div>
    );
}