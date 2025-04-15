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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { RootState } from "../../store";
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/redux-hooks/reduxHooks";
import { getHistoryFunds } from "../../common/store/historyFund/historyFundSlice";

const TransactionHistory = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { isReloadNeeded, historyFunds } = useAppSelector(
    (state: RootState) => state.historyFund
  );

  useEffect(() => {
    if (isReloadNeeded) {
      dispatch(getHistoryFunds());
    }
  }, [isReloadNeeded, dispatch]);

  return (
    <Box p={2} width="100%">
      <Typography
        variant="h4"
        color="primary"
        mb={3}
        textAlign={isMobile ? "center" : "left"}
      >
        Historial de Transacciones
      </Typography>

      <Box sx={{ overflowX: "auto" }}>
        <TableContainer component={Paper} sx={{ minWidth: 600 }}>
          <Table size="small">
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
                  <TableCell>
                    {tx.state === 1 ? "Abierto" : "Cerrado"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TransactionHistory;
