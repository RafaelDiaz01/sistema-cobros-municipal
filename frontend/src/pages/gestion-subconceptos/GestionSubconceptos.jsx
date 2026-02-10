import { useState, useEffect, useMemo } from "react";
import { FileText, Check, X, HandCoins } from "lucide-react";
import { getSubconceptosAPI } from "../../services/subconceptoService.js";
import { subconceptosColumns } from "./subconceptos.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";

export default function Subconceptos() {
  const [subconceptos, setSubconceptos] = useState([]);

  useEffect(() => {
    fetchSubconceptos();
  }, []);

  const fetchSubconceptos = async () => {
    try {
      const data = await getSubconceptosAPI();
      setSubconceptos(data);
    } catch (error) {
      console.error("Error fetching subconceptos:", error);
    }
  };

  const stats = useMemo(() => {
    return [
      {
        title: "Total Subconceptos",
        value: subconceptos.length,
        icon: <FileText size={26} />,
      },
      {
        title: "Subconceptos Activos",
        value: subconceptos.filter((s) => s.activo).length,
        icon: <Check size={26} />,
      },
      {
        title: "Subconceptos Inactivos",
        value: subconceptos.filter((s) => !s.activo).length,
        icon: <X size={26} />,
      },
      {
        title: "Son Cobrables",
        value: subconceptos.filter((s) => s.es_cobrable).length,
        icon: <HandCoins size={26} />,
      },
    ];
  }, [subconceptos]);

  const handleDelete = (id) => {
    // Lógica para eliminar la sección
  };

  const handleEdit = (id) => {
    // Lógica para editar la sección
  };

  return (
    <PageLayout>
      <Stack>
        <SectionTittle
          text="Gestión de Subconceptos"
          textButton="Agregar Subconcepto"
        />
        <StatsCards stats={stats} />
        <Table
          rows={subconceptos}
          columns={subconceptosColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_subconcepto}
        />
      </Stack>
    </PageLayout>
  );
}
