import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { database, fireDb } from "../../firebase/firebase";
import { ref, onValue } from 'firebase/database';
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";

export const selectFetchUserDataStatus = state => state.home.userDataFetchStatus;
export const selectAllBlogsResponse = state => state.home.allBlogsResponse;
export const selectAllBlogFetchStatus = state => state.home.allBlogFetchStatus;
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

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const userDetailsDB = ref(database, 'ancilife/usersInfo/val-ganesh');
    return new Promise((resolve, reject) => {
        onValue(userDetailsDB, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                resolve(data.userInfoDetails);
            } else {
                reject(new Error('No data available'));
            }
        });
    });
});

export const fetchAllBlogs = createAsyncThunk('user/fetchAllBlogs', async () => {
    try {
        const q = query(
            collection(fireDb, "blogPost"),
            orderBy('time')
        );

        const querySnapshot = await getDocs(q);
        let blogArray = [];
        querySnapshot.forEach((doc) => {
            blogArray.push({ ...doc.data(), id: doc.id });
        });
        blogArray = convertTimestamps(blogArray);
        return blogArray;
    } catch (error) {
        console.error('Fetching all blogs failed', error);
    }
});

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        userDataFetchStatus: 'loading',
        allBlogFetchStatus: 'loading',
        userDataResponse: {},
        allBlogsResponse: null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userDataResponse = action.payload;
        },
        setAllBlogsResponse: (state, action) => {
            state.allBlogsResponse = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.userDataFetchStatus = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userDataFetchStatus = 'succeeded';
                state.userData = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.userDataFetchStatus = 'failed';
                state.error = action.error.message;
            });
        builder
            .addCase(fetchAllBlogs.pending, (state) => {
                state.allBlogFetchStatus = 'loading';
            })
            .addCase(fetchAllBlogs.fulfilled, (state, action) => {
                state.allBlogFetchStatus = 'succeeded';
                state.allBlogsResponse = action.payload;
            })
            .addCase(fetchAllBlogs.rejected, (state, action) => {
                state.allBlogFetchStatus = 'failed';
                state.error = action.error.message;
            });
    },
})

export const selectAllBlogsWithId = createSelector([selectAllBlogsResponse],(allBlogsResponse) => {
    if(!allBlogsResponse) return null;
    // console.log('response', allBlogsResponse)
    const extractedData = allBlogsResponse.map(blog => ({
        id: blog.id,
        category: blog.blogs.category,
        content: blog.blogs.content,
        title: blog.blogs.title,
        blogThumnail: blog.thumbnail
      }));
    return extractedData;
})

export const { setUserData } = homeSlice.actions;
export default homeSlice.reducer;