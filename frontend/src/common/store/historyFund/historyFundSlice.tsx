import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../store";
import { displayLoader, removeProcess } from "../loading/loadingSlice";
import * as Api from "../../../api/historyFund";
import {
  CurrentFund,
  ResponseCurrentFunds,
} from "../../../interfaces/currentFunds";

interface UserState {
  isReloadNeeded: boolean;
  historyFunds: CurrentFund[];
}

const initialState: UserState = {
  isReloadNeeded: true,
  historyFunds: [],
};

const slice = createSlice({
  name: "historyFund",
  initialState,
  reducers: {
    getHistoryFundInit: (state) => {
      state.isReloadNeeded = true;
    },
    getHistoryFundSucess: (state, acton: PayloadAction<CurrentFund[]>) => {
      state.isReloadNeeded = false;
      state.historyFunds = acton.payload;
    },
  },
});

export const {} = slice.actions;
export default slice.reducer;

export const getHistoryFunds = (): AppThunk => async (dispatch) => {
  const idProcess: string = dispatch(displayLoader());
  dispatch(slice.actions.getHistoryFundInit());
  try {
    const response: ResponseCurrentFunds = await Api.getHistoryFunds();
    dispatch(slice.actions.getHistoryFundSucess(response.data));
    dispatch(removeProcess(idProcess));
    return response;
  } catch (error) {
    console.log({ error });
    dispatch(removeProcess(idProcess));
  }
};
