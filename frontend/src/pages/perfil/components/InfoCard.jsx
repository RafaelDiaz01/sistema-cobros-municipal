import Stack from "../../../components/layouts/Stack.jsx";
import Grid from "../../../components/modals/components/Grid.jsx";
import CardCobro from "../../../components/cards/CardCobro.jsx";
import timeFormatter from "../../../utils/timeFormatter.js";

export default function InfoCard({ user }) {
    return (
        <CardCobro title="Información Personal">
            <Stack size="sm">
                <Grid cols={1} md={2}>
                    <InfoField label="Nombre Completo" value={user.nombre_usuario} />
                    <InfoField label="Número de Teléfono" value={user.telefono} />
                    <InfoField label="Departamento Asignado" value={user.departamento} />
                    <InfoField label="Fecha de Registro" value={timeFormatter(user.createdAt)} />
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