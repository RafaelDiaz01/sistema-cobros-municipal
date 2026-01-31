import Stack from "../../layouts/Stack.jsx";

function Select({ label, options = [], disabled, ...props }) {
  return (
    <Stack size="xs">
      <label className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>{" "}
      </label>
      <select
        disabled={disabled}
        {...props}
        className={`w-full border rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 outline-none
    ${
      disabled
        ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
        : "bg-[#F9FAFB] border-[#E5E7EB] text-gray-800 focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"
    }`}
      >
        <option value="">Seleccione una opción</option>

        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </Stack>
  );
}
export default Select;
