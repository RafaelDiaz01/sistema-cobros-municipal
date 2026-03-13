import { useState, useEffect, useMemo } from "react";
import { Droplet, Check, X, GlassWater, Toilet } from "lucide-react";
import { getConexionesAPI } from "../../services/conexionService.js";
import { updateConexionEstadoAPI } from "../../services/conexionService.js";
import { showToast } from "../../utils/alerts/toast.js";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import { conexionColumns } from "./conexion.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";
import AddConexionModal from "../../components/features/conexiones/AddConexionesModal.jsx";

export default function GestionConexion() {
  const [conexiones, setConexiones] = useState([]);
  const [open, setOpen] = useState(false);
  const [conexionesEdit, setConexionesEdit] = useState(null);

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
      },
      {
        title: "Conexiones de Drenaje",
        value: conexiones.filter((c) => c.tipo === "Drenaje").length,
        icon: <Toilet size={26} />,
      },
    ];
  }, [conexiones]);

  const handleAdd = () => {
    setConexionesEdit(null);
    setOpen(true);
  };

  const handleEdit = (conexion) => {
    console.log("Editar conexión:", conexion);
    setConexionesEdit(conexion);
    setOpen(true);
  };

  const handleDelete = async (id_conexion, estadoActual) => {
    const nuevoEstado = !estadoActual;
    const mensaje = nuevoEstado
      ? "¿Desea activar esta conexión?"
      : "¿Desea inactivar esta conexión?";

    const confirmacion = await alertConfirmation(
      "Atención",
      mensaje,
      "warning",
    );
    if (!confirmacion) return;

    try {
      await updateConexionEstadoAPI(id_conexion, { estado: nuevoEstado });
      fetchConexiones();
      showToast("success", "Estado actualizado exitosamente");
    } catch (error) {
      console.error("Error al cambiar el estado de la conexión:", error);
      showToast("error", "Error al cambiar el estado de la conexión");
    }
  };

  return (
    <PageLayout>
      <Stack>
        <SectionTittle
          text="Gestión de Conexión"
          onAdd={handleAdd}
          textButton="Agregar Conexión"
        />
        {open && (
          <AddConexionModal
            isOpen={open}
            onClose={() => setOpen(false)}
            conexion={conexionesEdit}
            onSuccess={fetchConexiones}
          />
        )}
        <StatsCards stats={stats} columns={5} />
        <Table
          rows={conexiones}
          columns={conexionColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_conexion}
        />
      </Stack>
    </PageLayout>
  );
}
