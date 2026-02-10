import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";

export default function Conceptos() {
  return (
    <PageLayout>
      <Stack>
        <SectionTittle
          text="Gestión de Conceptos"
          textButton="Agregar Concepto"
        />
      </Stack>
    </PageLayout>
  );
}
