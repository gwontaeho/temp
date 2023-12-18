import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
};

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        toggle: (state, action) => {
            state.open = !state.open;
        },
    },
});

export const { toggle } = notificationSlice.actions;

export default notificationSlice.reducer;
