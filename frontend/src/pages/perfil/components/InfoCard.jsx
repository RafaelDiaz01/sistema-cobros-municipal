import Stack from "../../../components/layouts/Stack.jsx";
import Grid from "../../../components/modals/components/Grid.jsx";
import CardCobro from "../../../components/cards/CardCobro.jsx";

export default function InfoCard({ user }) {
    return (
        <CardCobro title="Información Personal">
            <Stack size="sm">
                <Grid cols={1} md={2}>
                    <InfoField label="Nombre Completo" value={user.nombre_usuario} />
                    <InfoField label="Número de Teléfono" value={"951 580 1224"} />
                    <InfoField label="Departamento Asignado" value={"Regiduría de Hacienda"} />
                    <InfoField label="Fecha de Registro" value={"23 de Junio, 2024"} />
                </Grid>
            </Stack>
        </CardCobro>
    )
}

const InfoField = ({ label, value }) => (
    <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase pb-2">
            {label}
        </span>
        <span className="text-[14px] text-slate-700 font-medium border-b border-slate-100 pb-1">
            {value}
        </span>
    </div>
);