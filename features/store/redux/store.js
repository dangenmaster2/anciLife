import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../../login/login.slice"; // Make sure the import path is correct

export const store = configureStore({
  reducer: {
    login: loginSlice  // Change the name here from loginSlice to login
  }
});