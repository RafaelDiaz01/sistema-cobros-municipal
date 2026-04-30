export default function GlobalFooter() {
    const phone = "529515801224";
    const message = "Hola, necesito soporte técnico con el sistema de cobros municipales.";

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <div className="absolute bottom-4 w-full text-center text-xs text-black/80 z-20 pointer-events-auto">
            ¿Necesita ayuda?{" "}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline cursor-pointer"
            >
                Soporte Técnico
            </a>
        </div>
    );
}