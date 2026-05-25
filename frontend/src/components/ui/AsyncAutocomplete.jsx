import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce.js";
import Stack from "../../components/layouts/Stack.jsx";

export default function AsyncAutocomplete({
  value,
  inputValue,
  onSelect,
  onInputChange,
  searchFn,
  disabled = false,
  getOptionLabel,
  renderOption,
  placeholder = "",
  error
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    if (!debouncedSearch || debouncedSearch.length < 2) {
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
    <Stack size="xs">
      <Autocomplete
        disabled={disabled}
        options={options}
        loading={loading}
        getOptionLabel={getOptionLabel}
        value={value}
        inputValue={inputValue}
        onChange={(_, newValue) => onSelect(newValue)}
        onInputChange={(_, newInputValue) => onInputChange(newInputValue)}
        filterOptions={(x) => x}
        renderOption={renderOption}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
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
                backgroundColor: "#F9FAFB",
                fontSize: "0.875rem",
                padding: 0,
                minHeight: "40px",
                border: "1px solid #E5E7EB",
                "&.Mui-focused": {
                  borderColor: "var(--color-acento)",
                  boxShadow: "0 0 0 1px var(--color-acento)",
                },
              },
              "& .MuiOutlinedInput-input": {
                padding: "8px 12px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& input::placeholder": {
                color: "#9CA3AF",
                opacity: 1,
              },
            }}
          />
        )}
      />
      {/* HELPER */}
      {error && (
        <p className="text-red-500 text-xs">
          {error?.message}
        </p>
      )}
    </Stack>
  );
}
