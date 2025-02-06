import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import carReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import requestReducer from "./slices/requestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: carReducer,
    user: userReducer,
    requests: requestReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
