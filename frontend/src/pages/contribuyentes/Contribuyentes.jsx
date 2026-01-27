import { useEffect, useState, useMemo } from "react";
import { Users, UserCheck, UserX, IdCard } from "lucide-react";
import { getContribuyentes, updateStatusContribuyenteAPI } from "../../api/contribuyentes.js";
import { showToast } from "../../utils/alerts/toast.js";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import { contribuyentesColumns } from "./contribuyetes.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTitle from "../../components/titles/SectionTitle.jsx";
import AddContribuyenteModal from "../../components/modals/AddContribuyenteModal.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";

const Contribuyentes = () => {
  const [contribuyentes, setContribuyentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [contribuyenteEdit, setContribuyenteEdit] = useState(null);

  useEffect(() => {
    fetchContribuyentes();
  }, []);

  const stats = useMemo(() => {
    const total = contribuyentes.length;
    const activos = contribuyentes.filter((c) => c.activo).length;
    const inactivos = total - activos;
    const conIne = contribuyentes.filter((c) => c.copia_credencial).length;

    return [
      {
        title: "Total de Contribuyentes",
        value: total,
        icon: <Users size={26} />,
      },
      {
        title: "Activos",
        value: activos,
        icon: <UserCheck size={26} />,
      },
      {
        title: "Inactivos",
        value: inactivos,
        icon: <UserX size={26} />,
      },
      {
        title: "Con INE",
        value: conIne,
        icon: <IdCard size={26} />,
      },
    ];
  }, [contribuyentes]);

  const fetchContribuyentes = async () => {
    try {
      setLoading(true);
      const data = await getContribuyentes();
      setContribuyentes(data);
    } catch (error) {
      console.error("Error al cargar contribuyentes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, estadoActual) => {
    const nuevoEstado = !estadoActual;
    const mensaje = nuevoEstado
      ? "¿Deseas activar este contribuyente?"
      : "¿Deseas desactivar este contribuyente?";

    const confirmacion = await alertConfirmation(
      "Atención",
      mensaje,
      "warning",
    );
    if (!confirmacion) return;

    try {
      await updateStatusContribuyenteAPI(id, { estado: nuevoEstado });
      fetchContribuyentes();
      showToast("success", "Estado actualizado exitosamente");
    } catch (error) {
      console.error("Error al cambiar el estado contribuyente", error);
      alert("Error al cambiar el estado del contribuyente");
    }
  };

  // Abrir modal para crear
  const handleAdd = () => {
    setContribuyenteEdit(null);
    setOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = (contribuyente) => {
    setContribuyenteEdit(contribuyente);
    setOpen(true);
  };

  return (
    <PageLayout>
      <Stack size="xl">
        {/* TÍTULO DEL MÓDULO */}
        <SectionTitle
          text="Gestión de Contribuyentes"
          onAdd={handleAdd}
          textButton="Agregar Contribuyente"
        />
        {/* MODAL PARA AGREGAR CONTRIBUYENTE */}
        {open && (
          <AddContribuyenteModal
            onClose={() => setOpen(false)}
            contribuyente={contribuyenteEdit}
            onSuccess={fetchContribuyentes}
          />
        )}
        {/* ESTADISTÍCAS DEL MÓDULO */}
        {loading ? (
          <p>Cargando Estadísticas</p>
        ) : (
          <StatsCards stats={stats} />
        )}
        <Table
          rows={contribuyentes}
          loading={loading}
          columns={contribuyentesColumns(handleEdit, handleDelete)}
          getRowId={(row) => row.id_contribuyente}
        />
      </Stack>
    </PageLayout>
  );
};

export default Contribuyentes;
