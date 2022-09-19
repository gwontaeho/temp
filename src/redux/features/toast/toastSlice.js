import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    message: "",
};

export const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        openToast: (state, action) => {
            state.open = true;
            state.message = action.payload;
        },
        closeToast: (state, action) => {
            state.open = false;
        },
    },
});

export const { openToast, closeToast } = toastSlice.actions;

export default toastSlice.reducer;
