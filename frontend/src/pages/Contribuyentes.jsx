import { useEffect, useState, useMemo } from "react";
import { Users, UserCheck, UserX, IdCard } from "lucide-react";
import {
  getContribuyentes,
  updateStatusContribuyenteAPI,
} from "../api/contribuyentes.js";
import StatsCards from "../components/cards/StatsCards.jsx";
import PageLayout from "../components/layouts/PageLayout.jsx";
import SectionTitle from "../components/titles/SectionTitle.jsx";
import AddContribuyenteModal from "../components/modals/add-contribuyente/AddContribuyenteModal.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Stack from "../components/layouts/Stack.jsx";
import { showToast } from "../utils/alerts/toast.js";
import { alertConfirmation } from "../utils/alerts/alert.js";
import Table from "../components/table/Table.jsx";
import { contribuyentesColumns } from "../pages/contribuyetes.columns.jsx";

const Contribuyentes = () => {
  const [contribuyentes, setContribuyentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [contribuyenteEdit, setContribuyenteEdit] = useState(null);

  useEffect(() => {
    fetchContribuyentes();
  }, []);

  const [search, setSearch] = useState("");

  const filteredContribuyentes = useMemo(() => {
    if (!search) return contribuyentes;

    const term = search.toLowerCase();

    return contribuyentes.filter((c) =>
      [c.nombre, c.apellido_paterno, c.apellido_materno, c.rfc, c.telefono]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [search, contribuyentes]);

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
      console.log("Contribuyentes cargados:", data);
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

    // El código espera aquí hasta que el usuario haga clic
    const confirmacion = await alertConfirmation(
      "Atención",
      mensaje,
      "warning"
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
      <Stack gap="gap-10">
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
          <p>Cargando estadísticas...</p>
        ) : (
          <StatsCards stats={stats} />
        )}
        {/* BARRA DE BÚSQUEDA */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nombre, RFC o clave catastral"
        />
        {/* <Table
          contribuyentes={filteredContribuyentes}
          loading={loading}
          updateStatus={handleDelete}
          onEdit={handleEdit}
        /> */}
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
