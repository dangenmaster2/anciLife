import {createSlice } from "@reduxjs/toolkit";

export const selectUserInfoCollected = state => state.layout.userInfoCollected;

const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        userInfoCollected: false
    },
    reducers: {
        setUserInfoCollected: (state, action) => { state.userInfoCollected = action.payload },
    }
})

export const { setUserInfoCollected } = layoutSlice.actions;
export default layoutSlice.reducer;