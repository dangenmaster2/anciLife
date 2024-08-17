import { createSlice } from "@reduxjs/toolkit";

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
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        }
    }
})

export const { setUserEmail, setPassword, setConfirmPassword } = loginSlice.actions;
export default loginSlice.reducer;