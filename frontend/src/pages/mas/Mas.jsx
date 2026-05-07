import { useNavigate } from "react-router-dom";
import {
  Receipt,
  BookOpen,
  Layers,
  LayoutGrid,
  ListChecks,
  Sliders,
  Key,
  Store,
  Map,
  FileText,
  WalletCards,
  Droplet,
  User
} from "lucide-react";
import SectionTitleSimple from "../../components/titles/SectionTitleSimple.jsx";
import SectionSubtitle from "../../components/titles/SectionSubtitle.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import CatalogCard from "../../components/cards/CatalogCard.jsx";

export default function Mas() {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <Stack size="lg">
        <SectionTitleSimple text="Menú de Gestión General" />
        {/* ================= FINANZAS ================= */}
        <SectionSubtitle title="Finanzas y Contabilidad">
          <Grid>
            <CatalogCard
              icon={<Receipt size={20} />}
              title="Gestión de Recibos"
              description="Administración y emisión de comprobantes oficiales."
              onClick={() => navigate("/gestion-recibos")}
            />
            <CatalogCard
              icon={<WalletCards size={20} />}
              title="Gestión de Estímulo Fiscal"
              description="Control de beneficios fiscales para contribuyentes."
              onClick={() => navigate("/gestion-estimulos")}
            />
            <CatalogCard
              icon={<FileText size={20} />}
              title="Gestión de Ejercicio Fiscal"
              description="Administración del ejercicio fiscal anual."
              onClick={() => navigate("/gestion-ejercicios")}
            />
            <CatalogCard
              icon={<BookOpen size={20} />}
              title="Cuentas Contables"
              description="Control maestro del catálogo de cuentas contables."
              onClick={() => navigate("/gestion-cuentas")}
            />
          </Grid>
        </SectionSubtitle>

        {/* ================= CONFIGURACIÓN ================= */}
        <SectionSubtitle title="Configuración de Cobros">
          <Grid>
            <CatalogCard
              icon={<Layers size={20} />}
              title="Subcuentas Contables"
              description="Desglose analítico de las subcuentas contables."
              onClick={() => navigate("/gestion-subcuentas")}
            />
            <CatalogCard
              icon={<LayoutGrid size={20} />}
              title="Gestión de Sección"
              description="Organización de las secciones administrativas."
              onClick={() => navigate("/gestion-secciones")}
            />
            <CatalogCard
              icon={<ListChecks size={20} />}
              title="Gestión de Concepto"
              description="Definición de conceptos según la Ley de Ingresos."
              onClick={() => navigate("/gestion-conceptos")}
            />
            <CatalogCard
              icon={<Sliders size={20} />}
              title="Gestión de Subconcepto"
              description="Especificación de tarifas para las subcuentas."
              onClick={() => navigate("/gestion-subconceptos")}
            />
          </Grid>
        </SectionSubtitle>

        {/* ================= SERVICIOS ================= */}
        <SectionSubtitle title="Servicios y Padrones">
          <Grid>
            <CatalogCard
              icon={<Key size={20} />}
              title="Gestión de Alquiler"
              description="Control de bienes municipales públicos."
              onClick={() => navigate("/gestion-alquiler")}
            />
            <CatalogCard
              icon={<Droplet size={20} />}
              title="Gestión de Conexión"
              description="Monitoreo de tomas de servicios y conexiones."
              onClick={() => navigate("/gestion-conexion")}
            />
            <CatalogCard
              icon={<Store size={20} />}
              title="Gestión de Establecimiento"
              description="Padrón de establecimientos comerciales."
              onClick={() => navigate("/establecimientos")}
            />
            <CatalogCard
              icon={<Map size={20} />}
              title="Base Catastral"
              description="Actualización de predios y avalúos del municipio."
              onClick={() => navigate("/base-catastral")}
            />
          </Grid>
        </SectionSubtitle>

        {/* ================= USUARIOS ================= */}
        <SectionSubtitle title="Usuarios y Permisos">
          <Grid>
            <CatalogCard
              icon={<User size={20} />}
              title="Gestión de Usuarios"
              description="Administración de usuarios, roles y permisos."
              onClick={() => navigate("/gestion-usuarios")}
            />
          </Grid>
        </SectionSubtitle>
      </Stack>
    </PageLayout>
  );
}

/* ================= COMPONENTES INTERNOS ================= */

function Grid({ children }) {
  return (
    <div
      className="
      grid gap-6
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
    "
    >
      {children}
    </div>
  );
}
