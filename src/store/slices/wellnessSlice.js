import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestoreFunctions } from '../../firebase';

export const addMoodEntryAsync = createAsyncThunk(
  'wellness/addMoodEntry',
  async ({ userId, moodData }, { rejectWithValue }) => {
    try {
      const { docId, error } = await firestoreFunctions.addMoodEntry(userId, moodData);
      if (error) return rejectWithValue(error);
      return { id: docId, ...moodData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMoodEntries = createAsyncThunk(
  'wellness/fetchMoodEntries',
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await firestoreFunctions.getMoodEntries(userId);
      if (error) return rejectWithValue(error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCommunityPostAsync = createAsyncThunk(
  'wellness/addCommunityPost',
  async ({ userId, postData }, { rejectWithValue }) => {
    try {
      const { docId, error } = await firestoreFunctions.addCommunityPost(userId, postData);
      if (error) return rejectWithValue(error);
      return { id: docId, ...postData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCommunityPosts = createAsyncThunk(
  'wellness/fetchCommunityPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await firestoreFunctions.getCommunityPosts(userId);
      if (error) return rejectWithValue(error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBookmarkAsync = createAsyncThunk(
  'wellness/addBookmark',
  async ({ userId, bookmarkData }, { rejectWithValue }) => {
    try {
      const { docId, error } = await firestoreFunctions.addBookmark(userId, bookmarkData);
      if (error) return rejectWithValue(error);
      return { id: docId, ...bookmarkData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wellnessSlice = createSlice({
  name: 'wellness',
  initialState: {
    moodEntries: [],
    communityPosts: [],
    bookmarks: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWellnessError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add Mood Entry
    builder
      .addCase(addMoodEntryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMoodEntryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.moodEntries.unshift(action.payload);
        state.error = null;
      })
      .addCase(addMoodEntryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Mood Entries
    builder
      .addCase(fetchMoodEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoodEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.moodEntries = action.payload;
        state.error = null;
      })
      .addCase(fetchMoodEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Community Post
    builder
      .addCase(addCommunityPostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommunityPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.communityPosts.unshift(action.payload);
        state.error = null;
      })
      .addCase(addCommunityPostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Community Posts
    builder
      .addCase(fetchCommunityPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunityPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.communityPosts = action.payload;
        state.error = null;
      })
      .addCase(fetchCommunityPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Bookmark
    builder
      .addCase(addBookmarkAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBookmarkAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks.unshift(action.payload);
        state.error = null;
      })
      .addCase(addBookmarkAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWellnessError } = wellnessSlice.actions;
export default wellnessSlice.reducer;
