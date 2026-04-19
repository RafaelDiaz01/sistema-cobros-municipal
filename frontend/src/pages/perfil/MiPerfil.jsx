import { useState } from "react";
import { useAuth } from "../../context/authContext";
import PageLayout from "../../components/layouts/PageLayout";
import Stack from "../../components/layouts/Stack";
import Grid from "../../components/modals/components/Grid";
import SectionTitleSimple from "../../components/titles/SectionTitleSimple";
import ProfileHeader from "./components/ProfileHeader";
import InfoCard from "./components/InfoCard";
import SecurityCard from "./components/SecurityCard";
import ActivityCard from "./components/ActivityCard";

export default function MiPerfil() {
    const { user, loading } = useAuth();
    if (loading) return <PageLayout><p>Cargando...</p></PageLayout>;

    const profileUser = {
        nombre_usuario: user.nombre_usuario,
        rol_usuario: user.rol_usuario,
        ultimo_acceso: user.ultimo_acceso,
        activo: user.activo,
    };

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

