import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import AppRoutes from "./routes/Routes";
import Loading from "./components/Loading/Loading";
import { Toaster } from "react-hot-toast";

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
      <Loading />
      <Toaster
        position="top-right"
        toastOptions={{
          error: {
            duration: 5000,
          },
          success: {
            duration: 7000,
          },
          loading: {
            duration: 2000,
          },
          style: {
            fontSize: "16px",
            background: "#fff",
            color: "#2e7d32",
          },
        }}
      />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
