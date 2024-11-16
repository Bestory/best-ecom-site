import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/users/userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});