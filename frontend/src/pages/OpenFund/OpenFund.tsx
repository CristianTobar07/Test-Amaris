import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useState } from "react";

const fondos = [
  { id: "1", name: "FPV Cliente", min: 75000 },
  { id: "2", name: "FMC Profesional", min: 120000 },
];

const OpenFund = () => {
  const [form, setForm] = useState({
    fondoId: "",
    monto: "",
    notificacion: "email",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Typography variant="h4" color="primary" mb={4}>
        Open New Fund
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          select
          fullWidth
          label="Select Fund"
          name="fondoId"
          value={form.fondoId}
          onChange={handleChange}
          margin="normal"
        >
          {fondos.map((f) => (
            <MenuItem key={f.id} value={f.id}>
              {f.name} (Min: ${f.min.toLocaleString()})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Amount"
          name="monto"
          type="number"
          value={form.monto}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          select
          fullWidth
          label="Notification Method"
          name="notificacion"
          value={form.notificacion}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="sms">SMS</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3 }}
        >
          Subscribe
        </Button>
      </form>
    </Box>
  );
};

export default OpenFund;
