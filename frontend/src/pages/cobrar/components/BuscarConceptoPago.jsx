import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "../../../hooks/useDebounce.js";

export default function BuscarConceptoPago({ onSelect, searchFn }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    if (!debouncedSearch) {
      setOptions([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await searchFn(debouncedSearch);
        setOptions(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch, searchFn]);

  return (
    <Autocomplete
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.nombre}
      onChange={(_, value) => value && onSelect(value)}
      inputValue={inputValue}
      onInputChange={(_, value) => setInputValue(value)}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Ej. Predial, Agua, Impuestos"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Search size={18} className="text-[var(--color-primario)] mr-2" />
            ),
            endAdornment: (
              <>
                {loading && <CircularProgress size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
            className:
              "w-full pl-10 pr-3 py-2 rounded-lg bg-[#F9FAFB] " +
              "border border-[#E5E7EB] text-sm focus:outline-none",
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
