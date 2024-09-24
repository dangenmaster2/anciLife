import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query } from "firebase/firestore";
import { fireDb } from "../../firebase/firebase";

export const selectAllMeditationsFetchStatus = state => state.meditation.allMeditationFetchStatus;
export const selectAllMeditationsType = state => state.meditation.allMeditationTypes;
export const selectAllMeditationsDataResponse = state => state.meditation.meditationsAllDataResponse;
export const selectAllMeditationsDataFetchStatus = state => state.meditation.allMeditationsDataFetchStatus;

const convertTimestamps = (obj) => {
    if (obj instanceof Object && obj !== null) {
        if (obj.nanoseconds !== undefined && obj.seconds !== undefined) {
            return obj.toDate().toISOString();
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = convertTimestamps(obj[key]);
            }
        }
    }
    return obj;
};

export const fetchAllMeditationsType = createAsyncThunk('user/fetchAllMeditationsType', async () => {
    try {
        const q = query(
            collection(fireDb, "availableMeditations"),
        );
        const querySnapshot = await getDocs(q);
        let meditationsArray = [];
        querySnapshot.forEach((doc) => {
            meditationsArray.push({ ...doc.data(), id: doc.id });
        });
        meditationsArray = convertTimestamps(meditationsArray);
        
        return meditationsArray[0]?.availableMeditations;
    } catch (error) {
        console.error('Fetching all meditations failed', error);
    }
})

export const fetchAllMeditationsData = createAsyncThunk('user/fetchAllMeditationsData', async () => {
    try {
        const q = query(
            collection(fireDb, "meditationData"),
        );
        const querySnapshot = await getDocs(q);
        let meditationsDataArray = [];
        querySnapshot.forEach((doc) => {
            meditationsDataArray.push({ ...doc.data(), id: doc.id });
        });
        meditationsDataArray = convertTimestamps(meditationsDataArray);
        
        return meditationsDataArray;
    } catch (error) {
        console.error('Fetching all meditations failed', error);
    }
})

const meditationSlice = createSlice({
    name: 'meditation',
    initialState: {
        allMeditationFetchStatus: 'loading',
        allMeditationsDataFetchStatus: 'loading',
        allMeditationTypes: null,
        meditationsAllDataResponse: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMeditationsType.pending, (state) => {
                state.allMeditationFetchStatus = 'loading';
            })
            .addCase(fetchAllMeditationsType.fulfilled, (state, action) => {
                state.allMeditationFetchStatus = 'succeeded';
                state.allMeditationTypes = action.payload;
            })
            .addCase(fetchAllMeditationsType.rejected, (state, action) => {
                state.allMeditationsDataFetchStatus = 'failed';
                state.error = action.error.message;
            });
        builder
            .addCase(fetchAllMeditationsData.pending, (state) => {
                state.allMeditationsDataFetchStatus = 'loading';
            })
            .addCase(fetchAllMeditationsData.fulfilled, (state, action) => {
                state.allMeditationsDataFetchStatus = 'succeeded';
                state.meditationsAllDataResponse = action.payload;
            })
            .addCase(fetchAllMeditationsData.rejected, (state, action) => {
                state.allMeditationsDataFetchStatus = 'failed';
                state.error = action.error.message;
            });
    }
})

export const selectMeditationTypeData = createSelector([selectAllMeditationsDataResponse],
    (allMeditationsDataResponse) => {
        if(!allMeditationsDataResponse) return null;
        const allMeditationsData = allMeditationsDataResponse.reduce((acc, data) => {
            const {meditation, id, thumbnail, backgroundColor, meditationId } = data;
            acc[data.meditationId] = {meditation, id, thumbnail, backgroundColor, meditationId};
            return acc;
        },{})
        
        return allMeditationsData;
    })

export default meditationSlice.reducer;