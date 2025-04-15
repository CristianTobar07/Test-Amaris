import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks/redux-hooks/reduxHooks";
import { RootState } from "../../store";
import { useEffect } from "react";
import {
  getCurrentFunds,
  closeInvestment,
} from "../../common/store/currentFund/currentFundSlice";

const CurrentFunds = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { dataUser } = useAppSelector((state: RootState) => state.header);
  const { isReloadNeeded, currentFunds } = useAppSelector(
    (state: RootState) => state.currentFund
  );

  useEffect(() => {
    if (isReloadNeeded) {
      dispatch(getCurrentFunds());
    }
  }, [isReloadNeeded, dispatch]);

  if (!dataUser) return null;

  const handleCloseInvestment = (idFund: string) => {
    dispatch(closeInvestment(idFund));
  };

  return (
    <Box px={2} py={3}>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Saldo:
              </Typography>
              <Typography variant="h5" color="secondary" fontWeight={600}>
                $ {dataUser.balance.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h4" color="primary" mb={2}>
        Inversiones Activas
      </Typography>

      <Grid container spacing={3}>
        {currentFunds.map((fund, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              elevation={2}
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                p: 2,
                height: "100%",
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  {fund.category_name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Inversión: ${fund.amont.toLocaleString()}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() => handleCloseInvestment(fund.uid)}
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  mt: isMobile ? 2 : 0,
                  alignSelf: isMobile ? "stretch" : "center",
                }}
              >
                Cancelar Inversión
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CurrentFunds;
