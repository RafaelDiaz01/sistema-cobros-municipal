import { useState, useEffect } from "react";
import PageLayout from "../../components/layouts/PageLayout";
import Stack from "../../components/layouts/Stack";
import Grid from "../../components/modals/components/Grid";
import SectionTitleSimple from "../../components/titles/SectionTitleSimple";
import GeneralParameters from "./components/GeneralParameters";

export default function Configuracion() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                // Simulación de carga
                await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (error) {
                console.error("Error al cargar la configuración:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    if (loading) return <PageLayout><p>Cargando...</p></PageLayout>;

    return (
        <PageLayout>
            <Stack size="xl">
                <SectionTitleSimple text="Configuración del Sistema" />
                <GeneralParameters />
            </Stack>
        </PageLayout>
    );
}