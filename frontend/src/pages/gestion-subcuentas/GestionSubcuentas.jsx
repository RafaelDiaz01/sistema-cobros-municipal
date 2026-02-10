import { useState, useEffect, useMemo } from "react";
import { FileText, Check, X, HandCoins } from "lucide-react";
import { getSubcuentasAPI } from "../../services/subcuentaService.js";
import { subcuentasColumns } from "./subcuentas.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTitle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";

export default function GestionSubcuentas() {
  const [subcuentas, setSubcuentas] = useState([]);

  useEffect(() => {
    fetchSubcuentas();
  }, []);

  const fetchSubcuentas = async () => {
    try {
      const data = await getSubcuentasAPI();
      setSubcuentas(data);
    } catch (error) {
      console.error("Error al cargar las subcuentas:", error);
    }
  };

  const stats = useMemo(() => {
    return [
      {
        title: "Total de Subcuentas",
        value: subcuentas.length,
        icon: <FileText size={26} />,
      },
      {
        title: "Subcuentas Activas",
        value: subcuentas.filter((subcuenta) => subcuenta.estado === "activo")
          .length,
        icon: <Check size={26} />,
      },
      {
        title: "Subcuentas Inactivas",
        value: subcuentas.filter((subcuenta) => subcuenta.estado === "inactivo")
          .length,
        icon: <X size={26} />,
      },
      {
        title: "Son Cobrables",
        value: subcuentas.filter((subcuenta) => subcuenta.cobrable).length,
        icon: <HandCoins size={26} />,
      },
    ];
  }, [subcuentas]);

  const handleDelete = (id) => {
    // Lógica para eliminar la cuenta
  };

  const handleEdit = (cuenta) => {
    // Lógica para editar la cuenta
  };

  return (
    <PageLayout>
      <Stack>
        <SectionTitle
          text="Gestión de Subcuentas"
          textButton="Agregar Subcuenta"
        />
        <StatsCards stats={stats} />
        <Table
          rows={subcuentas}
          columns={subcuentasColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_subcuenta}
        />
      </Stack>
    </PageLayout>
  );
}
