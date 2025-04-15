import {  configureStore, ThunkAction } from "@reduxjs/toolkit";
import loadingReducer from "./common/store/loading/loadingSlice";
import headerReducer from "./common/store/header/headerSlice";
import currentFundReducer from "./common/store/currentFund/currentFundSlice";
import historyFundReducer from "./common/store/historyFund/historyFundSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    header: headerReducer,
    currentFund: currentFundReducer,
    historyFund: historyFundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any // o Action<string>
>;