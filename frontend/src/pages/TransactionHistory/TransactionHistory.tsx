import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import { RootState } from "../../store";
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/redux-hooks/reduxHooks";
import { getHistoryFunds } from "../../common/store/historyFund/historyFundSlice";

const data = [
  {
    id: "T001",
    type: "Apertura",
    fondo: "FPV Cliente",
    monto: 75000,
    date: "2024-04-14",
    notificacion: "email",
  },
];

const TransactionHistory = () => {
  const dispatch = useAppDispatch();

  const { isReloadNeeded, historyFunds } = useAppSelector(
    (state: RootState) => {
      return state.historyFund;
    }
  );

  useEffect(() => {
    if (isReloadNeeded) {
      dispatch(getHistoryFunds());
    }
  }, [isReloadNeeded, dispatch]);

  return (
    <Box p={4}>
      <Typography variant="h4" color="primary" mb={4}>
        Transaction History
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e8f5e9" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyFunds.map((tx, index) => (
              <TableRow key={tx.uid}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{tx.category}</TableCell>
                <TableCell>{tx.category_name}</TableCell>
                <TableCell>${tx.amont.toLocaleString()}</TableCell>
                <TableCell>{tx.state === 1 ? "Abierto" : "Cerrado"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionHistory;
