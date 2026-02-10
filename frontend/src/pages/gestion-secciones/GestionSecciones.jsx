import { useState, useEffect, useMemo } from "react";
import { FileText, Check, X, HandCoins } from "lucide-react";
import { getSeccionesAPI } from "../../services/seccionService.js";
import { seccionesColumns } from "./secciones.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";

export default function Secciones() {
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    fetchSecciones();
  }, []);

  const fetchSecciones = async () => {
    try {
      const data = await getSeccionesAPI();
      setSecciones(data);
    } catch (error) {
      console.error("Error fetching secciones:", error);
    }
  };

  const stats = useMemo(() => {
    return [
      {
        title: "Total Secciones",
        value: secciones.length,
        icon: <FileText size={26} />,
      },
      {
        title: "Secciones Activas",
        value: secciones.filter((s) => s.estado === "activo").length,
        icon: <Check size={26} />,
      },
      {
        title: "Secciones Inactivas",
        value: secciones.filter((s) => s.estado === "inactivo").length,
        icon: <X size={26} />,
      },
      {
        title: "Son Cobrables",
        value: secciones.filter((s) => s.es_cobrable).length,
        icon: <HandCoins size={26} />,
      },
    ];
  }, [secciones]);

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
          text="Gestión de Secciones"
          textButton="Agregar Sección"
        />
        <StatsCards stats={stats} />
        <Table
          rows={secciones}
          columns={seccionesColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_seccion}
        />
      </Stack>
    </PageLayout>
  );
}
