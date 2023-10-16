import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
//query
import { authApi } from "./services/authApi.js";
import { headApi } from "./services/headquearterApi.js";
import { specApi } from "./services/specialtyApi.js"
import { userApi } from "./services/userApi.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [headApi.reducerPath]: headApi.reducer,
        [specApi.reducerPath]: specApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware]).concat([headApi.middleware]).concat([specApi.middleware]).concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export default store;