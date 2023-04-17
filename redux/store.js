import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import mainReducer from "./mainSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "main"],
};

const rootReducer = combineReducers({ auth: authReducer, main: mainReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: "production",
});
const persistor = persistStore(store);

export { store, persistor };
