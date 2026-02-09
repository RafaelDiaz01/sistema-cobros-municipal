import { useMemo } from "react";
import { DollarSign, HandCoins, Receipt, ReceiptText, SmartphoneNfc } from "lucide-react";
import PageLayout from "../../components/layouts/PageLayout";
import Stack from "../../components/layouts/Stack";
import SectionTitleSimple from "../../components/titles/SectionTitleSimple.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";

export default function GestionRecibos() {
  const stats = useMemo(() => {
    return [
      {
        title: "Total de Recibos",
        value: 100,
        icon: <ReceiptText />,
      },
      {
        title: "Total Pagado",
        value: 80,
        icon: <DollarSign />,
      },
      {
        title: "Recibos Pagados con Efectivo",
        value: 20,
        icon: <HandCoins />,
      },
      {
        title: "Recibos Pagados con Transferencia",
        value: 60,
        icon: <SmartphoneNfc />,
      }
    ];
  }, []);
  return (
    <PageLayout>
      <Stack size="xl">
        <SectionTitleSimple text="Gestión de Recibos" />
        <StatsCards stats={stats} />
      </Stack>
    </PageLayout>
  );
}
