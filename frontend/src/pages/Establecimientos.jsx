import { useEffect, useMemo, useState } from "react";
import {
  Store,
  MapPinCheckInside,
  MapPinXInside,
  IterationCcw,
} from "lucide-react";
import PageLayout from "../components/layouts/PageLayout";
import Stack from "../components/layouts/Stack";
import SectionTitle from "../components/titles/SectionTitle.jsx";
import AddEstablecimientoModal from "../components/modals/AddEstablecimientoModal.jsx";
import StatsCards from "../components/cards/StatsCards";
import Table from "../components/table/Table.jsx";
import { getEstablecimientos } from "../api/establecimientos.js";
import { updateStatusEstablecimientoAPI } from "../api/establecimientos.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { establecimientosColumns } from "./establecimientos/establecimientos.columns.jsx";

const MySwal = withReactContent(Swal);

export default function Establecimientos() {
  const [establecimientos, setEstablecimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [establecimientoEdit, setEstablecimientoEdit] = useState(null);

  useEffect(() => {
    fetchEstablecimientos();
  }, []);

  const stats = useMemo(() => {
    const total = establecimientos.length;
    const activos = establecimientos.filter((e) => e.activo).length;
    const inactivos = total - activos;
    const conGiro = establecimientos.filter((e) => e.giro).length;

    return [
      {
        title: "Total de Establecimientos",
        value: total,
        icon: <Store size={26} />,
      },
      {
        title: "Establecimientos Activos",
        value: activos,
        icon: <MapPinCheckInside size={26} />,
      },
      {
        title: "Establecimientos Inactivos",
        value: inactivos,
        icon: <MapPinXInside size={26} />,
      },
      {
        title: "Establecimientos Con Giro",
        value: conGiro,
        icon: <IterationCcw size={26} />,
      },
    ];
  }, [establecimientos]);

  const fetchEstablecimientos = async () => {
    try {
      setLoading(true);
      const data = await getEstablecimientos();
      console.log("Establecimientos cargados:", data);
      setEstablecimientos(data);
    } catch (error) {
      console.error("Error al cargar establecimientos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    const mensaje = nuevoEstado
      ? "¿Deseas activar este establecimiento?"
      : "¿Deseas desactivar este establecimiento?";

    const confirmacion = await MySwal.fire({
      title: "Confirmar acción",
      text: mensaje,
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "var(--color-acento)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    });
    if (!confirmacion.isConfirmed) return;

    try {
      await updateStatusEstablecimientoAPI(id, { estado: nuevoEstado });
      fetchEstablecimientos();
      MySwal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Estado actualizado exitosamente",
      });
    } catch (error) {
      console.error("Error al cambiar el estado del establecimiento", error);
      alert("Error al cambiar el estado del establecimiento");
    }
  };

  // Abrir modal para crear
  const handleAdd = () => {
    setEstablecimientoEdit(null);
    setOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = (establecimiento) => {
    setEstablecimientoEdit(establecimiento);
    setOpen(true);
  };

  return (
    <PageLayout>
      <Stack gap="gap-10">
        <SectionTitle
          text="Gestión de Establecimientos"
          onAdd={handleAdd}
          textButton="Agregar Establecimiento"
        />
        {open && (
          <AddEstablecimientoModal
            onClose={() => setOpen(false)}
            onSuccess={fetchEstablecimientos}
            establecimiento={establecimientoEdit}
          />
        )}
        <StatsCards stats={stats} />
        <Table
          rows={establecimientos}
          loading={loading}
          columns={establecimientosColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_estableciemiento}
        />
      </Stack>
    </PageLayout>
  );
}
