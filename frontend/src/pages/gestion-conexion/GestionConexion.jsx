import { useState, useEffect, useMemo } from "react";
import { Droplet, Check, X, GlassWater } from "lucide-react";
import { getConexionesAPI } from "../../services/conexionService.js";
import { conexionColumns } from "./conexion.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";

export default function GestionConexion() {
  const [conexiones, setConexiones] = useState([]);

  useEffect(() => {
    fetchConexiones();
  }, []);

  const fetchConexiones = async () => {
    try {
      const data = await getConexionesAPI();
      setConexiones(data);
    } catch (error) {
      console.error("Error fetching conexiones:", error);
    }
  };

  const stats = useMemo(() => {
    return [
      {
        title: "Total Conexiones",
        value: conexiones.length,
        icon: <Droplet size={26} />,
      },
      {
        title: "Conexiones Activas",
        value: conexiones.filter((c) => c.activo).length,
        icon: <Check size={26} />,
      },
      {
        title: "Conexiones Inactivas",
        value: conexiones.filter((c) => !c.activo).length,
        icon: <X size={26} />,
      },
      {
        title: "Conexiones de Agua Potable",
        value: conexiones.filter((c) => c.tipo === "Agua Potable").length,
        icon: <GlassWater size={26} />,
      }
    ];
  }, [conexiones]);

  const handleEdit = (conexion) => {
    console.log("Editar conexión:", conexion);
  };

  const handleDelete = (id_conexion, activo) => {
    console.log(`${activo ? "Desactivar" : "Activar"} conexión con ID:`, id_conexion);
  };

  return (
    <PageLayout>
      <Stack>
        <SectionTittle
          text="Gestión de Conexión"
          textButton="Agregar Conexión"
        />
        <StatsCards stats={stats} />
        <Table
          rows={conexiones}
          columns={conexionColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_conexion}
        />
      </Stack>
    </PageLayout>
  );
}
