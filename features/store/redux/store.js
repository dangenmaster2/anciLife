import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "../../layout/layout.slice";
import loginSlice from "../../login/login.slice";
import onBoardingSlice from "../../onboarding/onBoarding.slice";
import userInfoSlice from "../../userInfo/userInfo.slice";
import homeSlice from "../../home/home.slice";
import meditationSlice from "../../meditation/meditation.slice";

export const store = configureStore({
  reducer: {
    layout: layoutSlice,
    login: loginSlice ,
    onboarding: onBoardingSlice,
    userinfo: userInfoSlice,
    home: homeSlice,
    meditation: meditationSlice
  }
});