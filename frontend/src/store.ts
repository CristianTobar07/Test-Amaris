import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loadingReducer from "./common/store/loading/loadingSlice";
import headerReducer from "./common/store/header/headerSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    header: headerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppThunkTemplate<T> = ThunkAction<
  T,
  RootState,
  unknown,
  Action<string>
>;
