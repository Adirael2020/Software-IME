import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
//query
import { authApi } from "./services/userApi.js";
import { headApi } from "./services/headquearterApi.js";
import { specApi } from "./services/specialtyApi.js"

const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [headApi.reducerPath]: headApi.reducer,
        [specApi.reducerPath]: specApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware]).concat([headApi.middleware]).concat([specApi.middleware]),
});

setupListeners(store.dispatch);

export default store;