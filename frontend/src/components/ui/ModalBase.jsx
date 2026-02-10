import { X } from "lucide-react";

export default function ModalBase({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = "max-w-4xl",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">
      <div
        className={`w-full ${maxWidth} bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh] animated-fade-up`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[var(--color-borde)]">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>

          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-black" />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 min-h-0 overflow-y-auto px-8 py-6">
          {children}
        </div>

        {/* FOOTER */}
        {footer && (
          <div className="px-8 py-5 border-t border-[var(--color-borde)] bg-white">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
