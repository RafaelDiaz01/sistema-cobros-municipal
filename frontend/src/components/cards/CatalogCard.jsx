import { ChevronRight } from "lucide-react";

export default function CatalogCard({ icon, title, description, onClick }) {
    return (
        <button
            onClick={onClick}
            className="
        w-full h-full text-left
        bg-white
        border border-[var(--color-borde)]
        rounded-2xl
        p-5
        flex flex-col gap-3
        hover:shadow-md
        hover:border-[var(--color-acento)]
        transition
      "
        >
            {/* ICONO */}
            <div className="w-10 h-10 rounded-xl bg-green-100 text-[var(--color-acento)] flex items-center justify-center">
                {icon}
            </div>

            {/* TEXTO */}
            <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900">
                    {title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* FLECHA */}
            <div className="flex justify-end">
                <ChevronRight size={18} className="text-gray-400" />
            </div>
        </button>
    );
}
