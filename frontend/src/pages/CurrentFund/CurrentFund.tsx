import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const mockData = [
  { name: "FPV Cliente", amount: 75000 },
  { name: "FMC Profesional", amount: 120000 },
];

const CurrentFunds = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" color="primary" mb={4}>
        Current Funds
      </Typography>

      <Grid container spacing={3}>
        {mockData.map((fondo, idx) => (
          <div key={idx} style={{ width: "100%" }}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {fondo.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Invested: ${fondo.amount.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Grid>
    </Box>
  );
};

export default CurrentFunds;
