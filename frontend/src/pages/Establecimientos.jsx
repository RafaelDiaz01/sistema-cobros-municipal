import PageLayout from "../components/layouts/PageLayout";
import Stack from "../components/layouts/Stack";
import SectionTitle from "../components/Titles.jsx/SectionTitle";

export default function Establecimientos() {
    return (
        <PageLayout>
            <Stack gap="gap-10">
                <SectionTitle text="Gestión de Establecimientos" />
            </Stack>
        </PageLayout>
    );
};