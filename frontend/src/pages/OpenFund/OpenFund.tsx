import {
  Box,
  MenuItem,
  Select,
  Typography,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { CATEGORIES, FUNDS } from "./constants"; // Ajusta según tu estructura
import toast from "react-hot-toast";
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/redux-hooks/reduxHooks";
import { openInvestment } from "../../common/store/openFund/openFundSlice";
import { OpenFundsForm } from "../../interfaces/openFunds";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { getCurrentFunds } from "../../common/store/currentFund/currentFundSlice";
import { getDataUser } from "../../common/store/header/headerSlice";

const FundSelector = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFund, setSelectedFund] = useState("");
  const [form, setForm] = useState({
    monto: "",
    notificacion: "email",
  });

  const { dataUser } = useAppSelector((state: RootState) => {
    return state.header;
  });

  const filteredFunds = FUNDS.filter(
    (fund) => fund.category === selectedCategory
  );
  const selectedFundData = FUNDS.find((f) => f.id === selectedFund);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedCategory(value);
    setSelectedFund("");
  };

  const handleFundChange = (event: SelectChangeEvent) => {
    setSelectedFund(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const submissionData: OpenFundsForm = {
      category: selectedCategory,
      category_name: selectedFundData?.name || "",
      amont: +form.monto,
      id_user: dataUser?.uid || "",
      state: 1,
    };

    if (selectedFundData) {
      if (selectedFundData.min > +submissionData.amont) {
        toast.error(
          "El monto mínimo de inversión es de " + selectedFundData?.min
        );
        return;
      }
    }

    const res = await dispatch(openInvestment(submissionData));
    if (res.status) {
      dispatch(getDataUser());
      dispatch(getCurrentFunds());
      navigate("/fondo-actual");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={3}
      width="100%"
      maxWidth={500}
      mx="auto"
    >
      <Typography variant="h6">Abrir fondo de inversión</Typography>

      {/* Selector de categoría */}
      <FormControl fullWidth>
        <InputLabel id="category-label">Categoría</InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategory}
          label="Categoría"
          onChange={handleCategoryChange}
        >
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth disabled={!selectedCategory}>
        <InputLabel id="fund-label">Fondo</InputLabel>
        <Select
          labelId="fund-label"
          value={selectedFund}
          label="Fondo"
          onChange={handleFundChange}
        >
          {filteredFunds.map((fund) => (
            <MenuItem key={fund.id} value={fund.id}>
              {fund.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedFundData && (
        <Typography color="text.secondary">
          Monto mínimo de inversión: ${selectedFundData.min.toLocaleString()}
        </Typography>
      )}

      <TextField
        fullWidth
        label="Monto a invertir"
        name="monto"
        type="number"
        value={form.monto}
        onChange={handleChange}
        required
      />

      <TextField
        select
        fullWidth
        label="Método de notificación"
        name="notificacion"
        value={form.notificacion}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="email">Correo electrónico</MenuItem>
        <MenuItem value="sms">Mensaje de texto</MenuItem>
      </TextField>

      {/* Botón de enviar */}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 2 }}
        disabled={!selectedCategory || !selectedFund}
      >
        Enviar solicitud
      </Button>
    </Box>
  );
};

export default FundSelector;
