import { useNavigate } from "react-router-dom";
import {
    Receipt,
    BookOpen,
    Layers,
    LayoutGrid,
    ListChecks,
    Sliders,
    Key,
    Wifi,
    Store,
    Map
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
                            description="Administración, validación y emisión masiva de comprobantes oficiales."
                        />
                        <CatalogCard
                            icon={<Receipt size={20} />}
                            title="Gestión de Estímulo Fiscal"
                            description="Administración, validación y emisión masiva de comprobantes oficiales."
                        />
                        <CatalogCard
                            icon={<Receipt size={20} />}
                            title="Gestión de Ejercicio Fiscal"
                            description="Administración, validación y emisión masiva de comprobantes oficiales."
                        />
                        <CatalogCard
                            icon={<BookOpen size={20} />}
                            title="Cuentas Contables"
                            description="Control maestro del catálogo de cuentas de mayor y armonización contable."
                        />
                    </Grid>
                </SectionSubtitle>

                {/* ================= CONFIGURACIÓN ================= */}
                <SectionSubtitle title="Configuración de Cobros">
                    <Grid>
                        <CatalogCard
                            icon={<Layers size={20} />}
                            title="Subcuentas Contables"
                            description="Desglose analítico de cuentas para un seguimiento detallado del presupuesto."
                        />
                        <CatalogCard
                            icon={<LayoutGrid size={20} />}
                            title="Gestión de Sección"
                            description="Organización y jerarquía de las secciones administrativas operativas."
                        />
                        <CatalogCard
                            icon={<ListChecks size={20} />}
                            title="Gestión de Concepto"
                            description="Definición de conceptos de cobro según la Ley de Ingresos vigente."
                        />
                        <CatalogCard
                            icon={<Sliders size={20} />}
                            title="Gestión de Subconcepto"
                            description="Especificación de tarifas y variantes para cada concepto principal."
                        />
                    </Grid>
                </SectionSubtitle>

                {/* ================= SERVICIOS ================= */}
                <SectionSubtitle title="Servicios y Padrones">
                    <Grid>
                        <CatalogCard
                            icon={<Key size={20} />}
                            title="Gestión de Alquiler"
                            description="Control de arrendamientos de espacios y bienes municipales públicos."
                        />
                        <CatalogCard
                            icon={<Wifi size={20} />}
                            title="Gestión de Conexión"
                            description="Monitoreo y alta de tomas de servicios y conexiones de red."
                        />
                        <CatalogCard
                            icon={<Store size={20} />}
                            title="Gestión de Establecimiento"
                            description="Padrón de establecimientos comerciales y licencias de funcionamiento."
                            onClick={() => navigate("/establecimientos")}
                        />
                        <CatalogCard
                            icon={<Map size={20} />}
                            title="Base Catastral"
                            description="Actualización de predios, avalúos y zonificación del municipio."
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
        <div className="
      grid gap-6
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
    ">
            {children}
        </div>
    );
}
