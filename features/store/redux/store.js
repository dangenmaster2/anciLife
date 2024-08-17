import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "../../login/login.slice";
export const store = configureStore({
    reducer: {
        loginSlice: loginSlice
    }
})