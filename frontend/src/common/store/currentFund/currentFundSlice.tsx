import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../store";
import { displayLoader, removeProcess } from "../loading/loadingSlice";
import * as Api from "../../../api/currentFund";
import {
  CloseInvestmentResponse,
  CurrentFund,
  ResponseCurrentFunds,
} from "../../../interfaces/currentFunds";
import toast from "react-hot-toast";
import { getDataUser } from "../header/headerSlice";

interface UserState {
  isReloadNeeded: boolean;
  currentFunds: CurrentFund[];
}

const initialState: UserState = {
  isReloadNeeded: true,
  currentFunds: [],
};

const slice = createSlice({
  name: "currectFund",
  initialState,
  reducers: {
    getCurrentFundInit: (state) => {
      state.isReloadNeeded = true;
    },
    getCurrentFundSucess: (state, acton: PayloadAction<CurrentFund[]>) => {
      state.isReloadNeeded = false;
      state.currentFunds = acton.payload;
    },
    closeInvestmentSucess: (state, acton: PayloadAction<string>) => {
      state.isReloadNeeded = false;
      state.currentFunds = state.currentFunds.filter(
        (fund) => fund.uid !== acton.payload
      );
    },
  },
});

export const {} = slice.actions;
export default slice.reducer;

export const getCurrentFunds = (): AppThunk => async (dispatch) => {
  const idProcess: string = dispatch(displayLoader());
  dispatch(slice.actions.getCurrentFundInit());
  try {
    const response: ResponseCurrentFunds = await Api.getCurrentFunds();
    dispatch(slice.actions.getCurrentFundSucess(response.data));
    dispatch(removeProcess(idProcess));
    return response;
  } catch (error) {
    console.log({ error });
    dispatch(removeProcess(idProcess));
  }
};

export const closeInvestment =
  (idFund: string): AppThunk<Promise<CloseInvestmentResponse | void>> =>
  async (dispatch, getState) => {
    const idProcess = dispatch(displayLoader());
    const { uid } = getState().header.dataUser!;
    try {
      const response = await Api.closeInvestment(idFund, uid);
      if (!response?.status) {
        toast.error(response?.msg || "Error al cerrar la inversión");
        return;
      }
      toast.success(response.msg);
      dispatch(slice.actions.closeInvestmentSucess(idFund));
      dispatch(getDataUser());
      return response;
    } catch (error) {
      const message = "Error inesperado al cerrar la inversión";
      toast.error(message);
      throw error;
    } finally {
      dispatch(removeProcess(idProcess));
    }
  };
