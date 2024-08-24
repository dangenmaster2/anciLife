import { createSlice } from "@reduxjs/toolkit";

export const selectLoggedInState = state => state.login.loggedIn;
export const selectUserAuthenticated = state => state.login.userAuthenticated;

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: false,
        userAuthenticated: false
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setUserAuthenticated: (state, action) => {
            state.userAuthenticated = action.payload;
        }
    }
})

export const { setLoggedIn, setUserAuthenticated } = loginSlice.actions;
export default loginSlice.reducer;