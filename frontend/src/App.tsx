import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import AppRoutes from "./routes/Routes";

const theme = createTheme({
  palette: {
    mode: "light", // o 'light'
    primary: { main: "#2e7d32" },
    secondary: { main: "#558b2f" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
