import { Button, TextField } from "@mui/material";

export const SuscripcionForm = () => (
  <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <TextField label="Monto a invertir" type="number" variant="outlined" />
    <Button variant="contained" color="primary">
      Suscribirse
    </Button>
  </form>
);
