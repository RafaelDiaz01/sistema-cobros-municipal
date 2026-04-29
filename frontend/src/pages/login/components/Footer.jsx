// Calcular año actual para el footer
const currentYear = new Date().getFullYear();

export default function Footer() {
    return (
        <p className="text-xs text-black">
            © {currentYear} Ixtlán de Juárez
            <br />
            Todos los derechos reservados
        </p>
    );
}