import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/home.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        padding: 3,
      }}
    >
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Bienvenido a tu Plataforma de Inversión
      </Typography>
      <Typography variant="h6" maxWidth="600px" mb={4}>
        Gestiona tus fondos de forma rápida, segura y profesional.
      </Typography>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => navigate("/fondo-actual")}
        sx={{ fontWeight: "bold", fontSize: "1rem" }}
      >
        Invertir ahora
      </Button>
    </Box>
  );
};

export default Home;
