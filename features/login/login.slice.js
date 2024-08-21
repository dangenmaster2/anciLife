import { createSlice } from "@reduxjs/toolkit";

export const selectUserEmail = (state) => state.login.userEmail;
export const selectUserPassword = (state) => state.login.password;

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userEmail: '',
        password: '',
        confirmPassword: ''
    },
    reducers: {
        setUserEmail: (state, action) => {
            state.username = action.payload;
        },
        setGlobalPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        }
    }
})

export const { setUserEmail, setGlobalPassword, setConfirmPassword } = loginSlice.actions;
export default loginSlice.reducer;