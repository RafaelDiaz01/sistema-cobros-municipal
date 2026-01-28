import {
    Landmark,
    Clock,
    Calendar,
} from "lucide-react";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import Grid from "../../components/modals/components/Grid.jsx";
import SectionSimpleTitle from "../../components/titles/SectionTitleSimple.jsx";
import InfoBadge from "./components/InfoBadge.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";

export default function Corte() {
    return (
        <PageLayout>
            <Stack size="xl">
                <Grid cols={2} className="items-center">
                    <SectionSimpleTitle text="Corte de Caja" />
                    <Grid cols={4}>
                        <InfoBadge
                            label="Estado: Abierto"
                            status
                        />

                        <InfoBadge
                            icon={Landmark}
                            label="Caja: Principal"
                        />

                        <InfoBadge
                            icon={Clock}
                            label="Turno: Matutino"
                        />

                        <InfoBadge
                            icon={Calendar}
                            label="27/01/2026"
                        />
                    </Grid>
                </Grid>

                <StatsCards />
            </Stack>
        </PageLayout>
    );
};