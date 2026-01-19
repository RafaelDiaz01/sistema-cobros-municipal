import Stack from "../../layouts/Stack.jsx";

function Select({ label, options = [], ...props }) {
  return (
    <Stack gap="gap-1.5">
      <label className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>{" "}
      </label>
      <select
        {...props}
        className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400
            outline-none
            focus:border-[var(--color-acento)]
            focus:ring-1
            focus:ring-[var(--color-acento)]"
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
