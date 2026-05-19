import { Tooltip } from "@mui/material";
import { Info } from "lucide-react";
import Stack from "../../layouts/Stack.jsx";

function Input({ label, required = true, error, optional, disabled, ...props }) {
  return (
    <Stack size="xs">
      {/* LABEL */}
      <label className="text-sm font-medium">
        <span className="inline-flex items-center">
          {label} {required && <span className="ml-1 text-red-500">*</span>}
          {optional && (
            <Tooltip title="Este campo se puede dejar vacío" arrow>
              <Info size={14} className="ml-1 text-gray-400" />
            </Tooltip>
          )}
        </span>
      </label>

      {/* INPUT */}
      <input
        {...props}
        disabled={disabled}
        className="w-full border rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 outline-none bg-[#F9FAFB] border-[#E5E7EB] text-gray-800 focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"
      />

      {/* HELPER */}
      {error && <p className="text-red-500 text-xs">{error?.message}</p>}
    </Stack>
  );
}
export default Input;
