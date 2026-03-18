import { useState, useEffect, useMemo } from "react";
import { getBasesCatastralesAPI } from "../../services/baseCatastralService.js";
import { Home, Check, X, DollarSign } from "lucide-react";
import { basesCatastralesColumns } from "./bases.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";

export default function BaseCatastral() {
  const [basesCatastrales, setBasesCatastrales] = useState([]);

  useEffect(() => {
    fetchBases();
  }, []);

  const fetchBases = async () => {
    try {
      const data = await getBasesCatastralesAPI();
      setBasesCatastrales(data);
    } catch (error) {
      console.error("Error fetching bases catastrales:", error);
    }
  }

  const stats = useMemo(() => {
    return [
      {
        title: "Total de Bases Catastrales",
        value: basesCatastrales.length,
        icon: <Home size={26} />
      },
      {
        title: "Bases Catastrales Activas",
        value: basesCatastrales.filter((b) => b.activo).length,
        icon: <Check size={26} />
      },
      {
        title: "Bases Catastrales Inactivas",
        value: basesCatastrales.filter((b) => !b.activo).length,
        icon: <X size={26} />
      },
      {
        title: "Con Valor Superior a $500,000",
        value: basesCatastrales.filter((b) => b.valor > 500000).length,
        icon: <DollarSign size={26} />
      }
    ];
  }, [basesCatastrales]);

  const handleDelete = (base) => {
    console.log("Eliminar base catastral:", base);
  };

  const handleEdit = (base) => {
    console.log("Editar base catastral:", base);
  };

  return (
    <PageLayout>
      <Stack>
        <SectionTittle
          text="Gestión de Base Catastral"
          textButton="Agregar Base Catastral"
        />
        <StatsCards stats={stats} />
        <Table
          rows={basesCatastrales}
          columns={basesCatastralesColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_base_catastral}
        />
      </Stack>
    </PageLayout>
  );
}
