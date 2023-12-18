import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth";

export default configureStore({
  reducer: {
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
