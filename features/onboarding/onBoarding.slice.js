import { createSlice } from "@reduxjs/toolkit";

export const selectOnboardingCompleted = state => state.onboarding.onboardingCompleted;

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState: {
        onboardingCompleted: false
    },
    reducers: {
        setOnboardingCompleted: (state, action) => { state.onboardingCompleted = action.payload }
    }
})

export const { setOnboardingCompleted } = onboardingSlice.actions;
export default onboardingSlice.reducer;