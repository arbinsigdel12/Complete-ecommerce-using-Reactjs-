import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import fetchapireducer from "./slices/fetchapiSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    fetchapi: fetchapireducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
