import { Search } from "lucide-react";

export default function BuscarContribuyente() {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
      />
      <input
        placeholder="Buscar contribuyente..."
        className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#F9FAFB]
        border border-[#E5E7EB] text-sm"
      />
    </div>
  );
}
