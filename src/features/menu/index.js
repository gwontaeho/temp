import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    open: false,
  },
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close } = menuSlice.actions;

export default menuSlice.reducer;
