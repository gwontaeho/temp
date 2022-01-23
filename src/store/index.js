import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import menuReducer from "../features/menu";

export default configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
