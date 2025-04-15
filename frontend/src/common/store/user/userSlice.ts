import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  saldo: number;
  fondosActivos: string[];
}

const initialState: UserState = {
  saldo: 500000,
  fondosActivos: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSaldo: (state, action) => {
      state.saldo = action.payload;
    },
    toggleFondo: (state, action) => {
      const id = action.payload;
      if (state.fondosActivos.includes(id)) {
        state.fondosActivos = state.fondosActivos.filter((f) => f !== id);
      } else {
        state.fondosActivos.push(id);
      }
    },
  },
});

export const { setSaldo, toggleFondo } = userSlice.actions;
export default userSlice.reducer;
