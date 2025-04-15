import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunkTemplate } from "../../../store";
import { uid } from "uid";

export type Loader = {
  id: string;
  processName?: string;
};

type InitialState = {
  processes: Loader[];
};

const initialState: InitialState = {
  processes: [],
};

export const slice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    addProcess: (state, action: PayloadAction<Loader>): void => {
      const { id, processName } = action.payload;

      state.processes.push({
        processName: processName ?? `Process: ${id}`,
        id,
      });
    },
    removeProcess: (state, action: PayloadAction<string>): void => {
      const index = state.processes.findIndex(
        (loader) => loader.id === action.payload
      );
      state.processes.splice(index, 1);
    },
  },
});

export const { removeProcess } = slice.actions;

export default slice.reducer;

export type LoaderParams = {
  processName?: string;
  message?: string;
};

export const displayLoader =
  (processName?: string): AppThunkTemplate<string> =>
  (dispatch): string => {
    const id = uid();
    dispatch(slice.actions.addProcess({ id, processName }));
    return id;
  };
