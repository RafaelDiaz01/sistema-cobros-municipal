import ModalBase from "../../ui/ModalBase.jsx";
import Stack from "../../layouts/Stack.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import ViewItem from "../../modals/ViewItem.jsx";
import ViewList from "../../modals/ViewList.jsx";
import { Droplet, User, HandCoins } from "lucide-react";

export default function ViewConexionModal({ isOpen, onClose, adeudos, conexion }) {
    if (!conexion) return null;

    console.log("Datos de la conexión seleccionada:", conexion);

    return (
        <ModalBase
            isOpen={isOpen}
            onClose={onClose}
            title="Detalles de la Conexión"
            subtitle="Información completa de la conexión registrada"
            footer={
                <div className="flex justify-end pt-5">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-[var(--color-cancelar)] text-[var(--color-text-secundario)] text-sm"
                    >
                        Cerrar
                    </button>
                </div>
            }
        >
            <Stack size="lg">

                {/* DATOS DE LA CONEXIÓN */}
                <Section icon={<Droplet size={18} />} title="Datos de la Conexión">
                    <Grid cols={4}>
                        <ViewItem label="Cuenta Única" value={conexion.cuenta} />
                        <ViewItem label="Tipo de Conexión" value={conexion.tipo} />
                        <ViewItem label="Uso de Conexión" value={conexion.uso} />
                        <ViewItem label="Fecha de Registro" value={conexion.fecha_conexion} />
                    </Grid>
                    <Grid cols={2}>
                        <ViewItem label="Ubicación" value={`${conexion.calle} #${conexion.numero_calle || ""}, ${conexion.barrio}`} />
                        <ViewItem label="Referencia" value={conexion.referencia} />
                    </Grid>
                </Section>

                <hr className="border-[var(--color-borde)]" />

                {/* CONTRIBUYENTE PROPIETARIO */}
                <Section icon={<User size={18} />} title="Propietario">
                    <Grid cols={2}>
                        <ViewItem label="Nombre Completo" value={`${conexion.contribuyente?.nombre || ""} ${conexion.contribuyente?.apellido_paterno || ""} ${conexion.contribuyente?.apellido_materno || ""}`} />
                        <ViewItem label="Teléfono Celular" value={conexion.contribuyente?.telefono} />
                    </Grid>
                </Section>

                <hr className="border-[var(--color-borde)]" />

                {/* ADEUDOS */}
                <Section icon={<HandCoins size={18} />} title="Adeudos">
                    {/* Años de Adeudo */}
                    <ViewList
                        labelKey="Años de Adeudo"
                        items={adeudos.conexion.anios_adeudo}
                        emptyMessage="Sin años de adeudo"
                    />
                </Section>

            </Stack>
        </ModalBase>
    );
}
