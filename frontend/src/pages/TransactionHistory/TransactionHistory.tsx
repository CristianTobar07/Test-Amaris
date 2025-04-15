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
  return (
    <Box p={4}>
      <Typography variant="h4" color="primary" mb={4}>
        Transaction History
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e8f5e9" }}>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Fund</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Notification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.id}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.fondo}</TableCell>
                <TableCell>${tx.monto.toLocaleString()}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.notificacion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionHistory;
