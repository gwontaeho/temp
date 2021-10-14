import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
};

export const auth = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: "",
    type: 0,
  },
  reducers: {
    logIn: (state, action) => {
      console.log(action);
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.type = action.payload.type;
    },
    logOut: (state, action) => {
      state.isLoggedIn = false;
      state.token = "";
      state.type = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = auth.actions;

export default persistReducer(persistConfig, auth.reducer);
