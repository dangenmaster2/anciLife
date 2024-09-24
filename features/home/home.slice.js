import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { database, fireDb } from "../../firebase/firebase";
import { ref, onValue } from 'firebase/database';
import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";

export const selectFetchUserDataStatus = state => state.home.userDataFetchStatus;
export const selectAllBlogsResponse = state => state.home.allBlogsResponse;
export const selectAllBlogFetchStatus = state => state.home.allBlogFetchStatus;
export const selectQuoteFetchStatus = state => state.home.quoteFetchStatus;
export const selectAllCategoriesResponse = state => state.home.allCategoriesResponse;
export const selectQuoteResponse = state => state.home.currentQuoteResponse;
export const selectDeviceDimensions = state => state.home.deviceDimensions;

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

export const fetchAllCategories = createAsyncThunk('user/fetchAllCategories', async () => {
    try {
        const q = query(
            collection(fireDb, "availableCategories"),
            orderBy('time')
        );
        const querySnapshot = await getDocs(q);
        let categoriesArray = [];
        querySnapshot.forEach((doc) => {
            categoriesArray.push({ ...doc.data(), id: doc.id });
        });
        categoriesArray = convertTimestamps(categoriesArray);
        return categoriesArray;
    } catch (error) {
        console.error('Fetching all categories failed', error);
    }
})

export const fetchQuotes = createAsyncThunk('user/fetchAllQuotes', async () => {
    try {
        const q_check = query(collection(fireDb, "availableQuotes"));
        const q_checkSnapshot = await getDocs(q_check);
        const quotesSize = q_checkSnapshot.size;
        const randomIndex = Math.floor(Math.random() * quotesSize);
        const q = query(
            collection(fireDb, "availableQuotes"),
            orderBy('time')
        );
        const querySnapshot = await getDocs(q);
        let quotesArray = [];
        querySnapshot.forEach((doc) => {
            quotesArray.push({ ...doc.data(), id: doc.id });
        });
        quotesArray = convertTimestamps(quotesArray);
        console.log('generated Quote ', quotesArray[randomIndex]);
        return quotesArray[randomIndex];
    } catch (error) {
        console.error('Fetching all categories failed', error);
    }
})

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        userDataFetchStatus: 'loading',
        allBlogFetchStatus: 'loading',
        allCategoriesFetchStatus: 'loading',
        quoteFetchStatus: 'loading',
        userDataResponse: {},
        allBlogsResponse: null,
        allCategoriesResponse: null,
        currentQuoteResponse: null,
        deviceDimensions: {}
    },
    reducers: {
        setUserData: (state, action) => {
            state.userDataResponse = action.payload;
        },
        setAllBlogsResponse: (state, action) => {
            state.allBlogsResponse = action.payload;
        },
        setAllCategoriesResponse: (state, action) => {
            state.allCategoriesResponse = action.payload;
        },
        setDeviceDimensions: (state, action) => {
            state.deviceDimensions = action.payload;
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
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.allCategoriesFetchStatus = 'loading';
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.allCategoriesFetchStatus = 'succeeded';
                state.allCategoriesResponse = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.allCategoriesFetchStatus = 'failed';
                state.error = action.error.message;
            });
        builder
            .addCase(fetchQuotes.pending, (state) => {
                state.quoteFetchStatus = 'loading';
                state.currentQuoteResponse = null;
            })
            .addCase(fetchQuotes.fulfilled, (state, action) => {
                state.quoteFetchStatus = 'succeeded';
                state.currentQuoteResponse = action.payload;
            })
            .addCase(fetchQuotes.rejected, (state, action) => {
                state.quoteFetchStatus = 'failed';
                state.error = action.error.message;
                state.currentQuoteResponse = null;
            });
    },
})

export const selectAllBlogsWithId = createSelector([selectAllBlogsResponse],(allBlogsResponse) => {
    if(!allBlogsResponse) return null;
    const extractedData = allBlogsResponse.map(blog => ({
        id: blog.id,
        category: blog.blogs.category,
        content: blog.blogs.content,
        title: blog.blogs.title,
        blogThumnail: blog.thumbnail
      }));
    return extractedData;
})

export const selectAllCategories = createSelector([selectAllCategoriesResponse],(allCategoriesResponse) => {
    if (!allCategoriesResponse) return null;
    const allTopicsWithId = allCategoriesResponse.map((category) => ({
        id: category.id,
        category: category.category,
        image: category.thumbnail
    }))
    return allTopicsWithId;
})


export const { setUserData, setDeviceDimensions } = homeSlice.actions;
export default homeSlice.reducer;