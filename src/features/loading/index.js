import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    current: false,
  },
  reducers: {
    start: (state) => {
      state.current = true;
    },
    end: (state) => {
      state.current = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { start, end } = loadingSlice.actions;

export default loadingSlice.reducer;
