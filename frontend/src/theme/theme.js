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
    fontFamily: "DM Sans, sans-serif",
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
          overflow: "hidden",
          border: "1px solid var(--color-borde)",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          backgroundColor: "#FFFFFF",
        },

        columnHeaders: {
          backgroundColor: "#E8F8EE",
          borderBottom: "1px solid #E5E7EB",
        },

        columnHeadersInner: {
          backgroundColor: "#E8F8EE",
        },

        columnHeader: {
          backgroundColor: "#E8F8EE",
          color: "var(--color-texto)",
          fontWeight: 600,
        },
        cell: {
          color: "#374151",
          display: "flex",
          alignItems: "center",
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
