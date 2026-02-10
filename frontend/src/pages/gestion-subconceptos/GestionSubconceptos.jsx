import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";

export default function Subconceptos() {
  return (
    <PageLayout>
      <Stack>
        <SectionTittle
          text="Gestión de Subconceptos"
          textButton="Agregar Subconcepto"
        />
      </Stack>
    </PageLayout>
  );
}
