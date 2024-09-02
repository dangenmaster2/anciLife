import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "../../layout/layout.slice";
import loginSlice from "../../login/login.slice";
import onBoardingSlice from "../../onboarding/onBoarding.slice";
import userInfoSlice from "../../userInfo/userInfo.slice";

export const store = configureStore({
  reducer: {
    layout: layoutSlice,
    login: loginSlice ,
    onboarding: onBoardingSlice,
    userinfo: userInfoSlice,
  }
});