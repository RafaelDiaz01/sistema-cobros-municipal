import { useMemo, useState } from "react";
import {
  Store,
  MapPinCheckInside,
  MapPinXInside,
  IterationCcw,
} from "lucide-react";
import PageLayout from "../components/layouts/PageLayout";
import Stack from "../components/layouts/Stack";
import SectionTitle from "../components/Titles.jsx/SectionTitle";
import StatsCards from "../components/cards/StatsCards";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

export default function Establecimientos() {
  const [establecimientos, setEstablecimientos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const filteredEstablecimientos = useMemo(() => {
    if (!search) return establecimientos;

    const term = search.toLowerCase();

    return establecimientos.filter((e) =>
      [e.nombre, e.calle, e.barrio, e.fecha_apertura, e.giro]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [search, establecimientos]);

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
  return (
    <PageLayout>
      <Stack gap="gap-10">
        <SectionTitle
          text="Gestión de Establecimientos"
          textButton="Agregar Establecimiento"
        />
        <StatsCards stats={stats} />
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nombre o giro del establecimiento"
        />
        <Table
          contribuyentes={filteredEstablecimientos}
          loading={loading}
        //   updateStatus={handleDelete}
        //   onEdit={handleEdit}
        />
      </Stack>
    </PageLayout>
  );
}
