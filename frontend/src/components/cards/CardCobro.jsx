import Stack from "../layouts/Stack.jsx";

export default function CardCobro({ title, children, className = "" }) {
  return (
    <Stack gap="gap-1.5">
      <div
        className={`bg-white rounded-2xl border border-[var(--color-borde)] p-6 ${className}`}
      >
        {title && (
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        )}
        {children}
      </div>
    </Stack>
  );
}
