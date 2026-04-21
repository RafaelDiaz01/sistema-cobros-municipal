import { useState, useEffect } from "react";
import { getEjerciciosFiscalesAPI } from "../../services/ejercicioFiscalService.js";
import { ejerciciosColumns } from "./ejercicios.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTitleSimple from "../../components/titles/SectionTitleSimple.jsx";
import Table from "../../components/table/Table.jsx";
export default function GestionEjercicios() {
  const [ejerciciosFiscales, setEjerciciosFiscales] = useState([]);

  useEffect(() => {
    fetchEjerciciosFiscales();
  }, []);

  const fetchEjerciciosFiscales = async () => {
    try {
      const data = await getEjerciciosFiscalesAPI();
      setEjerciciosFiscales(data);
    } catch (error) {
      console.error("Error al cargar ejercicios fiscales", error);
    }
  };

  const handleDelete = (id_ejercicio) => {
    // Aquí puedes implementar la lógica para eliminar un ejercicio fiscal
    console.log("Eliminar ejercicio con ID:", id_ejercicio);
  };

  return (
    <PageLayout>
      <Stack>
        <SectionTitleSimple text="Gestión de Ejercicios Fiscales" />
        <Table
          rows={ejerciciosFiscales}
          columns={ejerciciosColumns(handleDelete)}
          getRowId={(row) => row.id_ejercicio}
        />
      </Stack>
    </PageLayout>
  );
}
