import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import profileReducer from "./slice/profileSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    profile: profileReducer,
  },
});
