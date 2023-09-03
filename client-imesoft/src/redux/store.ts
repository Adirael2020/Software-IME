import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
//query
import { authApi } from "./services/userApi.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware]),
});

setupListeners(store.dispatch);