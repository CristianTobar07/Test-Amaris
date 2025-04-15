import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../store";
import { displayLoader, removeProcess } from "../loading/loadingSlice";
import * as Api from "../../../api/header";
import { DataUser, ResponseDataUser } from "../../../interfaces/header";

interface UserState {
  isReloadNeeded: boolean;
  dataUser?: DataUser;
}

const initialState: UserState = {
  isReloadNeeded: true,
  dataUser: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getDataUserInit: (state) => {
      state.isReloadNeeded = true;
    },
    getDataUserSucess: (state, acton: PayloadAction<DataUser>) => {
      state.isReloadNeeded = false;
      state.dataUser = acton.payload;
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

export const getDataUser = (): AppThunk => async (dispatch) => {
  const idProcess: string = dispatch(displayLoader());
  dispatch(userSlice.actions.getDataUserInit());
  try {
    const response: ResponseDataUser = await Api.getDataUser();
    dispatch(userSlice.actions.getDataUserSucess(response.data));
    dispatch(removeProcess(idProcess));
    return response;
  } catch (error) {
    console.log({ error });
    dispatch(removeProcess(idProcess));
  }
};
