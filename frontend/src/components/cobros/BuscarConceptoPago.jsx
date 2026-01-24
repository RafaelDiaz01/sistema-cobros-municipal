import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce.js";

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
        setOptions(data);
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
      fullWidth
      getOptionLabel={(option) => option.nombre}
      onChange={(_, value) => value && onSelect(value)}
      inputValue={inputValue}
      onInputChange={(_, value) => setInputValue(value)}
      renderOption={(props, option) => (
        <li {...props} key={option.id} className="px-3 py-2">
          <div className="text-sm font-medium text-gray-800">
            {option.nombre}
          </div>

          <div className="text-xs text-gray-500">
            {option.monto_base} → {option.id} → {option.tipo}
          </div>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Buscar concepto de pago"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Search size={18} className="text-green-600 mr-2" />
            ),
            endAdornment: (
              <>
                {loading && <CircularProgress size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
            className:
              "bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm",
          }}
        />
      )}
    />
  );
}
