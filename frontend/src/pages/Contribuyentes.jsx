import { useEffect, useState, useMemo } from "react";
import { Users, UserCheck, UserX, IdCard } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  getContribuyentes,
  updateStatusContribuyenteAPI,
} from "../api/contribuyentes.js";
import StatsCards from "../components/StatsCards.jsx";
import PageLayout from "../components/layouts/PageLayout.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import AddContribuyenteModal from "../components/modals/add-contribuyente/AddContribuyenteModal.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Table from "../components/Table.jsx";
import Stack from "../components/layouts/Stack.jsx";
import Pagination from "../components/Pagination.jsx";

const Contribuyentes = () => {
  const [contribuyentes, setContribuyentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchContribuyentes();
  }, []);

  const [search, setSearch] = useState("");

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

    // El código espera aquí hasta que el usuario haga clic
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
      await updateStatusContribuyenteAPI(id, { estado: nuevoEstado });
      fetchContribuyentes();
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
      console.error("Error al cambiar el estado contribuyente", error);
      alert("Error al cambiar el estado del contribuyente");
    }
  };

  return (
    <PageLayout>
      <Stack gap="gap-10">
        {/* TÍTULO DEL MÓDULO */}
        <SectionTitle
          text="Gestión de Contribuyentes"
          onAdd={() => setOpen(true)}
        />
        {/* MODAL PARA AGREGAR CONTRIBUYENTE */}
        <AddContribuyenteModal
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={fetchContribuyentes}
        />
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
          placeholder="Buscar por nombre, CURP o clave catastral..."
        />
        <Table
          contribuyentes={contribuyentes}
          loading={loading}
          updateStatus={handleDelete}
        />
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={(page) => console.log("Cambiar a página:", page)}
        />
      </Stack>
    </PageLayout>
  );
};

export default Contribuyentes;
