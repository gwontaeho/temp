import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../features/notification/notificationSlice";
import toastReducer from "../features/toast/toastSlice";

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        toast: toastReducer,
    },
});
