export default function InfoBadge({
    icon: Icon,
    label,
    status = false,
    className = "",
}) {
    return (
        <div
            className={`
        flex h-7 items-center justify-center gap-3 rounded-full px-3
        text-xs font-medium
        bg-[var(--color-terciario)]
        border border-[var(--color-borde)]
        text-[var(--color-texto)]
        ${className}
      `}
        >
            {status ? (
                <span className="size-2 rounded-full bg-[var(--color-primario)]" />
            ) : Icon ? (
                <Icon size={14} className="text-[var(--color-primario)]" />
            ) : null}

            <span>{label}</span>
        </div>
    );
}
