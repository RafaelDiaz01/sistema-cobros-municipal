import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";

export default function BaseCatastral() {
  return (
    <PageLayout>
      <Stack>
        <SectionTittle
          text="Gestión de Base Catastral"
          textButton="Agregar Base Catastral"
        />
      </Stack>
    </PageLayout>
  );
}
