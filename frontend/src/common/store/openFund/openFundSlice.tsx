import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../../store";
import { displayLoader, removeProcess } from "../loading/loadingSlice";
import * as Api from "../../../api/openFund";
import { CloseInvestmentResponse } from "../../../interfaces/currentFunds";
import toast from "react-hot-toast";
import { OpenFundsForm, OpenFundsResponse } from "../../../interfaces/openFunds";

interface UserState {
  isReloadNeeded: boolean;
}

const initialState: UserState = {
  isReloadNeeded: true,
};

const slice = createSlice({
  name: "openFund",
  initialState,
  reducers: {
    getOpenFundSucess: (state) => {
      state.isReloadNeeded = false;
    },
  },
});

export const {} = slice.actions;
export default slice.reducer;

export const openInvestment =
  (
    dataNewFund: OpenFundsForm
  ): AppThunk<Promise<OpenFundsResponse>> =>
  async (dispatch) => {
    const idProcess = dispatch(displayLoader());
    try {
      const response = await Api.openInvestment(dataNewFund);
      if (!response?.status) {
        toast.error(response?.msg || "Error al cerrar la inversión");
        return;
      }
      toast.success(response.msg);
      dispatch(slice.actions.getOpenFundSucess());
      return response;
    } catch (error) {
      const message = "Error inesperado al cerrar la inversión";
      toast.error(message);
      throw error;
    } finally {
      dispatch(removeProcess(idProcess));
    }
  };
