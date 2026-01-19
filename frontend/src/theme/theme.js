import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1F5A3C",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          backgroundColor: "#FFFFFF",
        },

        columnHeaders: {
          backgroundColor: "#F9FAFB",
          borderBottom: "1px solid #E5E7EB",
        },

        columnHeadersInner: {
          backgroundColor: "#F9FAFB",
        },

        columnHeader: {
          backgroundColor: "#F9FAFB",
          color: "#111827",
          fontWeight: 600,
        },
        cell: {
          color: "#374151",
        },
        row: {
          "&:hover": {
            backgroundColor: "#F0F9FF",
          },
        },
      },
    },
  },
});

export default theme;
