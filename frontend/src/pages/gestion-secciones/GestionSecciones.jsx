import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";

export default function Secciones() {
  return (
    <PageLayout>
      <Stack>
        <SectionTittle
          text="Gestión de Secciones"
          textButton="Agregar Sección"
        />
      </Stack>
    </PageLayout>
  );
}
