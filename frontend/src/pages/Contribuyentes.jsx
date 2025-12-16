import { DollarSign, UserCheck, Users, Wallet } from "lucide-react";
import { useState } from "react";
import StatsCards from "../components/StatsCards.jsx";
import PageLayout from "../components/layouts/PageLayout.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Table from "../components/Table.jsx";
import Stack from "../components/layouts/Stack.jsx";
import Pagination from "../components/Pagination.jsx";

const Contribuyentes = () => {
  /* DATOS TEMPORALES */

  // Datos para las tarjetas de estadísticas
  const stats = [
    {
      icon: <Users size={26} />,
      title: "Total de Contribuyentes",
      value: "1,250",
    },
    {
      icon: <UserCheck size={26} />,
      title: "Activos",
      value: "1,180",
    },
    {
      icon: <Wallet size={26} />,
      title: "Con Adeudos",
      value: "75",
    },
    {
      icon: <DollarSign size={26} />,
      title: "Monto de Adeudos",
      value: "$15,200",
    },
  ];

  // Datos para la tabla de contribuyentes
  const contribuyentes = [
    {
      id: "IXJ-00123",
      nombre: "María Elena Sánchez",
      direccion: "Av. Juárez 10, Centro",
      telefono: "951-123-4567",
      estado: "Activo",
    },
    {
      id: "IXJ-00124",
      nombre: "Carlos Alberto Pérez",
      direccion: "Calle Morelos 25, Barrio Alto",
      telefono: "951-234-5678",
      estado: "Con Adeudo",
    },
    {
      id: "IXJ-00125",
      nombre: "Ana Sofía Ramírez",
      direccion: "Priv. de la Soledad 5",
      telefono: "951-345-6789",
      estado: "Activo",
    },
    {
      id: "IXJ-00126",
      nombre: "José Luis Hernández",
      direccion: "Carretera a Guelatao Km 2",
      telefono: "951-456-7890",
      estado: "Inactivo",
    },
  ];

  /* USE EFFECTS */
  const [search, setSearch] = useState("");

  return (
    <PageLayout>
      <Stack>
        {/* TÍTULO DEL MÓDULO */}
        <SectionTitle text="Gestión de Contribuyentes" />
        {/* ESTADISTÍCAS DEL MÓDULO */}
        <StatsCards stats={stats} />
        {/* BARRA DE BÚSQUEDA */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nombre, CURP o clave catastral..."
        />
        <Table data={contribuyentes} />
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
