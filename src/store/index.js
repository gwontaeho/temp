import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import menuSlice from "../features/menu";

export default configureStore({
  reducer: {
    auth: authReducer,
    menu: menuSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
