import { useState, useEffect, useMemo } from "react";
import { FileText, Check, X, HandCoins } from "lucide-react";
import { getConceptosAPI } from "../../services/conceptoService.js";
import { conceptosColumns } from "./conceptos.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";

export default function Conceptos() {
  const [conceptos, setConceptos] = useState([]);

  useEffect(() => {
    fetchConceptos();
  }, []);

  const fetchConceptos = async () => {
    try {
      const data = await getConceptosAPI();
      setConceptos(data);
    } catch (error) {
      console.error("Error fetching conceptos:", error);
    }
  };

  const stats = useMemo(() => {
    return [
      {
        title: "Total Conceptos",
        value: conceptos.length,
        icon: <FileText size={26} />,
      },
      {
        title: "Conceptos Activos",
        value: conceptos.filter((s) => s.estado === "activo").length,
        icon: <Check size={26} />,
      },
      {
        title: "Conceptos Inactivos",
        value: conceptos.filter((s) => s.estado === "inactivo").length,
        icon: <X size={26} />,
      },
      {
        title: "Son Cobrables",
        value: conceptos.filter((s) => s.es_cobrable).length,
        icon: <HandCoins size={26} />,
      },
    ];
  }, [conceptos]);

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
          text="Gestión de Conceptos"
          textButton="Agregar Concepto"
        />
        <StatsCards stats={stats} />
        <Table
          rows={conceptos}
          columns={conceptosColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_concepto}
        />
      </Stack>
    </PageLayout>
  );
}
