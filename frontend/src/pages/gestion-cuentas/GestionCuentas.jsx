import { useState, useEffect, useMemo } from "react";
import { getCuentasAPI } from "../../services/cuentaContablesService.js";
import { FileText, Check, X } from "lucide-react";
import { cuentasColumns } from "./cuentas.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout";
import Stack from "../../components/layouts/Stack";
import SectionTitle from "../../components/titles/SectionTitle";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";

export default function GestionCuentas() {
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    fetchCuentas();
  }, []);

  const fetchCuentas = async () => {
    try {
      const data = await getCuentasAPI();
      setCuentas(data);
    } catch (error) {
      console.error("Error al cargar las cuentas:", error);
    }
  };

  const stats = useMemo(() => {
    return [
      {
        title: "Total de Cuentas",
        value: cuentas.length,
        icon: <FileText size={26} />,
      },
      {
        title: "Cuentas Activas",
        value: cuentas.filter((cuenta) => cuenta.estado === "activo").length,
        icon: <Check size={26} />,
      },
      {
        title: "Cuentas Inactivas",
        value: cuentas.filter((cuenta) => cuenta.estado === "inactivo").length,
        icon: <X size={26} />,
      },
    ];
  }, [cuentas]);

  const handleDelete = (id) => {
    // Implementar la lógica para eliminar la cuenta
  };

  const handleEdit = (cuenta) => {
    // Implementar la lógica para editar la cuenta
  };

  return (
    <PageLayout>
      <Stack size="xl">
        <SectionTitle text="Gestión de Cuentas" textButton="Agregar Cuenta" />
        <StatsCards stats={stats} columns={3} />
        <Table
          rows={cuentas}
          columns={cuentasColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_cuenta_contable}
        />
      </Stack>
    </PageLayout>
  );
}
