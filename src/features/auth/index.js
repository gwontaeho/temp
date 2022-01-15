import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    id: "",
    token: "",
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.id = "";
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default persistReducer(persistConfig, authSlice.reducer);
