import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { searchContribuyentes } from "../../../services/contribuyentesService.jsx";

export default function BuscarContribuyente({ onSelect }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue.length < 2) {
      setOptions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchContribuyentes(inputValue);
        setOptions(data);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <Autocomplete
      options={options}
      loading={loading}
      getOptionLabel={(option) =>
        `${option.nombre} ${option.apellido_paterno} ${option.apellido_materno}`
      }
      onInputChange={(_, value) => setInputValue(value)}
      onChange={(_, value) => onSelect(value)}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Ej. Rafael Díaz López"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            className:
              "w-full pl-10 pr-3 py-2 rounded-lg bg-[#F9FAFB] " +
              "border border-[#E5E7EB] text-sm focus:outline-none",
            endAdornment: (
              <>
                {loading && <CircularProgress size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.5rem",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
      )}
    />
  );
}
