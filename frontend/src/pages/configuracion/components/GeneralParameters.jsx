import { Image, Info } from "lucide-react";
import CardCobro from "../../../components/cards/CardCobro";
import Grid from "../../../components/modals/components/Grid.jsx";
import Section from "../../../components/modals/components/Section.jsx";
import Input from "../../../components/modals/components/Input.jsx";
import Upload from "../../../components/modals/components/Upload.jsx";

export default function GeneralParameters() {
    return (
        <>
            <CardCobro title="Parámetros Generales">
                <Grid cols={3}>
                    <Input
                        label="Nombre del Sistema"
                        placeholder="Sistema de Cobros Municipal"
                    />
                    <Input
                        label="Nombre del Municipio"
                        placeholder="Ixtlán de Juárez"
                    />
                    <Input
                        label="RFC del Municipio"
                        placeholder="IXJ123456789"
                    />
                    <Input
                        label="Dirección del Municipio"
                        placeholder="Calle Revolución, La Soledad, Ixtlán de Juárez, Oaxaca"
                    />
                    <Input
                        label="Teléfono del Municipio"
                        placeholder="9511234567"
                    />
                    <Input
                        label="Correo del Municipio"
                        placeholder="info@ixtlan-de-juarez.oaxaca.gob.mx"
                    />
                </Grid>
                <div className="flex justify-end">
                    <Button variante="primary" onClick={() => { }}>
                        Guardar Cambios
                    </Button>
                </div>
            </CardCobro>

            <CardCobro title="Imágenes del Sistema">
                <Grid cols={2}>
                    <Upload
                        label="Logo del Sistema"
                        placeholder="Haz clic aquí para subir el logo del sistema"
                        required={true}
                    />
                    <Upload
                        label="RFC del Municipio"
                        placeholder="Haz clic aquí para subir el RFC del municipio"
                        required={true}
                    />
                </Grid>
                <div className="flex justify-end">
                    <Button onClick={() => { }}>
                        Guardar Cambios
                    </Button>
                </div>
            </CardCobro>
        </>
    );
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