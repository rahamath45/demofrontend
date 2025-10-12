import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { appApi } from "../slices/apiSlice";

const store = configureStore({
    reducer: {
        [appApi.reducerPath] : appApi.reducer,
        auth:authReducer
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(appApi.middleware)
})

export default store;