import Grid from "../modals/components/Grid";
import Input from "../modals/components/Input";

export default function Descuento() {
    return (
        <div class="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
            <Grid cols={2}>
            <Input label="Descuento Regular" placeholder="Ej. 50%" />

            <Input label="Descuento Adicional" />
            <p class="mt-1.5 text-[11px] text-gray-500 dark:text-gray-400 italic">Nota: El descuento adicional por pronto pago solo aplica en los meses de enero y febrero.</p>
            </Grid>
        </div>
    );
};