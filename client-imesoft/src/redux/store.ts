import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
//query
import { authApi } from "./services/userApi.js";
import { headApi } from "./services/headquearterApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [headApi.reducerPath]: headApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware]),
});

setupListeners(store.dispatch);

export default store;