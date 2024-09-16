import {createSelector, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {database} from '../../firebase/firebase';
import {ref, set} from 'firebase/database';

import axios from 'axios';

export const USER_NAME = 'USER_NAME';
export const USER_INTERESTS = 'USER_INTERESTS';
export const USER_GENDER = 'USER_GENDER';
export const USER_COUNTRY = 'USER_COUNTRY';

export const infoDirectionContainer = [
  USER_COUNTRY,
  USER_NAME,
  USER_GENDER,
  USER_INTERESTS,
];

export const selectAllCountriesList = state => state.userInfo.countriesResponse;

export const selectinfoDirectionIndex = state =>
  state.userinfo.infoDirectionIndex;
export const selectUserInfoFocusSection = createSelector(
  [selectinfoDirectionIndex],
  infoDirectionIndex => {
    return infoDirectionContainer[infoDirectionIndex - 1];
  },
);
export const selectAllUserInfo = state => state.userinfo.allUserInfo;

const userInfoSlice = createSlice({
  name: 'userinfo',
  initialState: {
    userInfoFocusSection: USER_COUNTRY,
    infoDirectionIndex: 1,
    userName: '',
    userGender: '',
    userInterests: [],
    allUserInfo: {},
    countriesResponse: [],
  },
  reducers: {
    setUserInfoFocusSection: (state, action) => {
      state.userInfoFocusSection = action.payload;
    },
    setInfoDirectionIndex: (state, action) => {
      state.infoDirectionIndex =
        action.payload > infoDirectionContainer.length
          ? infoDirectionContainer.length
          : action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserGender: (state, action) => {
      state.userGender = action.payload;
    },
    setUserInterests: (state, action) => {
      state.userInterests = action.payload;
    },
    setAllUserInfo: (state, action) => {
      state.allUserInfo = action.payload;
      postUserInfo(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCountries.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countriesResponse = action.payload;
        console.log(state.countriesResponse);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const postUserInfo = userInfoDetails => {
  set(ref(database, `ancilife/usersInfo/${userInfoDetails.userId}`), {
    userInfoDetails,
  });
};

// Create an async thunk to fetch the countries
export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await axios.get(
      'https://restcountries.com/v3.1/all?fields=name',
    );
    return response.data;
  },
);
export const allCountriesNames = () => {
  const countriesName = [
    'Australia',
    'Brazil',
    'Canada',
    'China',
    'Egypt',
    'France',
    'Germany',
    'India',
    'Indonesia',
    'Italy',
    'Japan',
    'Mexico',
    'Nigeria',
    'Pakistan',
    'Russia',
    'South Africa',
    'South Korea',
    'Spain',
    'Turkey',
    'United States',
  ];
  return countriesName;
};

export const {
  setUserInfoFocusSection,
  setInfoDirectionIndex,
  setUserName,
  setUserGender,
  setUserInterests,
  setAllUserInfo,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
