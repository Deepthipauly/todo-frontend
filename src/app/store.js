// package import
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/auth/authSlice";

// redux store
export const store = configureStore({
  reducer: {
    userData: userReducer,
  },
});
