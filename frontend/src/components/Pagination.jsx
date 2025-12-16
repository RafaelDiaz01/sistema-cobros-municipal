// Componente para la paginación

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  const pages = getPages(currentPage, totalPages);

  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-[var(--color-borde)]">
        {/* Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            w-8 h-8 flex items-center justify-center rounded-lg
            border border-[var(--color-borde)]
            ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }
          `}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Páginas */}
        {pages.map((page, i) =>
          page === "..." ? (
            <span key={i} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => onPageChange(page)}
              className={`
                w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium
                ${
                  page === currentPage
                    ? "bg-[var(--color-acento)] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              {page}
            </button>
          )
        )}

        {/* Siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            w-8 h-8 flex items-center justify-center rounded-lg
            border border-[var(--color-borde)]
            ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }
          `}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* Utilidad para manejar páginas largas */
function getPages(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, "...", total];
  }

  if (current >= total - 2) {
    return [1, "...", total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
}
