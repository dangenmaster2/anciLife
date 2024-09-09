import { createSelector, createSlice } from "@reduxjs/toolkit";
import { database } from "../../firebase/firebase";
import { ref, set } from 'firebase/database';

export const USER_NAME = 'USER_NAME';
export const USER_INTERESTS = 'USER_INTERESTS';
export const USER_GENDER = 'USER_GENDER';

export const infoDirectionContainer = [USER_NAME, USER_GENDER, USER_INTERESTS];
export const selectinfoDirectionIndex = state => state.userinfo.infoDirectionIndex;
export const selectUserInfoFocusSection = createSelector(
    [selectinfoDirectionIndex],
    (infoDirectionIndex) => {
    return infoDirectionContainer[infoDirectionIndex - 1]
})
export const selectAllUserInfo = state => state.userinfo.allUserInfo;

const userInfoSlice = createSlice({
    name: 'userinfo',
    initialState: {
        userInfoFocusSection: USER_NAME,
        infoDirectionIndex: 1,
        userName: '',
        userGender: '',
        userInterests: [],
        allUserInfo: {}
    },
    reducers: {
        setUserInfoFocusSection: (state, action) => { state.userInfoFocusSection = action.payload },
        setInfoDirectionIndex: (state, action) => {  
            state.infoDirectionIndex = action.payload > infoDirectionContainer.length ? infoDirectionContainer.length : action.payload;
        },
        setUserName: (state, action) => { state.userName = action.payload },
        setUserGender: (state, action) => { state.userGender = action.payload },
        setUserInterests: (state, action) => {state.userInterests = action.payload},
        setAllUserInfo: (state, action) => { 
            state.allUserInfo = action.payload ;
            postUserInfo(action.payload);
        }
    }
})

export const postUserInfo = (userInfoDetails) => {
    set(ref(database, `ancilife/usersInfo/${userInfoDetails.userId}`), {
        userInfoDetails
    })
}

export const { 
    setUserInfoFocusSection,
    setInfoDirectionIndex, 
    setUserName, 
    setUserGender, 
    setUserInterests,
    setAllUserInfo
} = userInfoSlice.actions;

export default userInfoSlice.reducer;