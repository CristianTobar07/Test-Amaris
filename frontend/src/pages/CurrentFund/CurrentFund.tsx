import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
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
import toast from "react-hot-toast";

const CurrentFunds = () => {
  const dispatch = useAppDispatch();

  const { dataUser } = useAppSelector((state: RootState) => {
    return state.header;
  });

  const { isReloadNeeded, currentFunds } = useAppSelector(
    (state: RootState) => {
      return state.currentFund;
    }
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
    <Box px={4}>
      <Grid container mb={4}>
        <div style={{ width: "100%" }}>
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
                $ {dataUser.balance}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Grid>

      <Typography variant="h4" color="primary" mb={2}>
        Fondos Actuales
      </Typography>

      <Grid container spacing={3}>
        {currentFunds.map((fund, idx) => (
          <div key={idx} style={{ width: "100%" }}>
            <Card
              elevation={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 2,
              }}
            >
              <CardContent>
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
                  height: "50%",
                }}
              >
                Cancelar Inversión
              </Button>
            </Card>
          </div>
        ))}
      </Grid>
    </Box>
  );
};

export default CurrentFunds;
