import { useState, useEffect } from "react";
import { getPerfilAPI } from "../../services/miPerfilService";
import PageLayout from "../../components/layouts/PageLayout";
import Stack from "../../components/layouts/Stack";
import Grid from "../../components/modals/components/Grid";
import SectionTitleSimple from "../../components/titles/SectionTitleSimple";
import ProfileHeader from "./components/ProfileHeader";
import InfoCard from "./components/InfoCard";
import SecurityCard from "./components/SecurityCard";
import ActivityCard from "./components/ActivityCard";

export default function MiPerfil() {
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const data = await getPerfilAPI();
                setProfileUser(data);
            } catch (error) {
                console.error("Error al cargar los datos del perfil:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfil();
    }, []);

    if (loading) return <PageLayout><p>Cargando...</p></PageLayout>;

    return (
        <PageLayout>
            <Stack size="xl">
                <SectionTitleSimple text="Mi Perfil" />

                { /* Perfil de Usuario */}
                <ProfileHeader user={profileUser} />

                { /* Información Personal y Seguridad */}
                <div className="flex flex-col lg:flex-row gap-5">

                    {/* Columna Izquierda */}
                    <Grid cols={1} className="flex-1">
                        <InfoCard user={profileUser} />
                        <SecurityCard />
                    </Grid>

                    {/* Columna Derecha */}
                    <Grid cols={1} className="w-full lg:w-72">
                        <ActivityCard user={profileUser} />
                    </Grid>
                </div>
            </Stack>
        </PageLayout>
    );
}

