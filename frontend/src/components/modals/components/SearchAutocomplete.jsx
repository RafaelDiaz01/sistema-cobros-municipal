import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import Stack from "../../layouts/Stack.jsx";

export default function SearchAutocomplete({
  name,
  control,
  label,
  placeholder,
  searchFn,
  getOptionLabel,
  getOptionValue,
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(""); // 👈 texto escrito

  // Aquí use Debounce para evitar muchas llamadas a la API
  useEffect(() => {
    if (!inputValue || inputValue.length < 2) {
      setOptions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchFn(inputValue);
        setOptions(data);
      } catch (error) {
        console.error("Error buscando:", error);
      } finally {
        setLoading(false);
      }
    }, 400); // ⏱️ debounce time

    return () => clearTimeout(timeout);
  }, [inputValue, searchFn]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Stack size="xs">
          {/* LABEL */}
          <label className="text-sm font-medium">
            {label} <span className="text-red-500">*</span>
          </label>

          <Autocomplete
            options={options}
            loading={loading}
            getOptionLabel={getOptionLabel}
            onInputChange={(_, value) => setInputValue(value)} // 👈 aquí
            onChange={(_, value) =>
              field.onChange(value ? getOptionValue(value) : null)
            }
            filterOptions={(x) => x} // 👈 IMPORTANTE (desactiva filtro interno de MUI)
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                InputProps={{
                  ...params.InputProps,
                  className:
                    "w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]",
                  endAdornment: (
                    <>
                      {loading && <CircularProgress size={20} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Stack>
      )}
    />
  );
}
