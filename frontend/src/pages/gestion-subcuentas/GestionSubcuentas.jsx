import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";

export default function GestionSubcuentas() {
  return (
    <PageLayout>
      <Stack>
        <SectionTittle
          text="Gestión de Subcuentas"
          textButton="Agregar Subcuenta"
        />
      </Stack>
    </PageLayout>
  );
}
