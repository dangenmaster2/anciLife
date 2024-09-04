import { createSlice } from "@reduxjs/toolkit";

export const selectOnboardingCompleted = state => state.onboarding.onboardingCompleted;
export const selectUserInfo = state => state.onboarding.userInfo;

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState: {
        onboardingCompleted: false,
        userInfo: false
    },
    reducers: {
        setOnboardingCompleted: (state, action) => { state.onboardingCompleted = action.payload },
        setUserInfo: (state, action) => { state.userInfo = action.payload },
    }
})

export const { setOnboardingCompleted, setUserInfo } = onboardingSlice.actions;
export default onboardingSlice.reducer;