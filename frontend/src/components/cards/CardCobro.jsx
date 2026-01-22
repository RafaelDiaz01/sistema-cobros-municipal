import Stack from "../layouts/Stack.jsx";

export default function CardCobro({ title, children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[var(--color-borde)] p-6 ${className}`}
    >
      <Stack size="sm">
        <h2 className="text-lg font-bold uppercase tracking-wider text-gray-500">{title}</h2>
        {children}
      </Stack>
    </div>
  );
}
