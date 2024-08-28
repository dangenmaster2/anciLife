import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../../login/login.slice"; // Make sure the import path is correct
import onBoardingSlice from "../../onboarding/onBoarding.slice";
import userInfoSlice from "../../userInfo/userInfo.slice";

export const store = configureStore({
  reducer: {
    login: loginSlice ,
    onboarding: onBoardingSlice,
    userinfo: userInfoSlice
  }
});