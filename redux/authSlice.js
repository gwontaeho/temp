import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    loginId: "",
    name: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const { loginId, name } = action.payload;
            if (loginId) state.loginId = loginId;
            if (name) state.name = name;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
