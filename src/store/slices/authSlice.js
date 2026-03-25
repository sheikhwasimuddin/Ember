import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authFunctions, firestoreFunctions } from '../../firebase';

export const signUpAsync = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, userData }, { rejectWithValue }) => {
    try {
      const { user, error } = await authFunctions.signUpWithEmail(email, password);
      if (error) return rejectWithValue(error);

      // Create user profile in Firestore
      const profileError = await firestoreFunctions.createUserProfile(user.uid, {
        email: user.email,
        displayName: userData.displayName || '',
        avatar: userData.avatar || '👤',
        bio: userData.bio || '',
        preferences: userData.preferences || {},
        goals: userData.goals || [],
        interests: userData.interests || [],
        notificationSettings: userData.notificationSettings || {},
      });

      if (profileError.error) return rejectWithValue(profileError.error);

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInAsync = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user, error } = await authFunctions.signInWithEmail(email, password);
      if (error) return rejectWithValue(error);

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogleAsync = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const { user, error } = await authFunctions.signInWithGoogle();
      if (error) return rejectWithValue(error);

      // Check if user profile exists, if not create it
      const profileData = await firestoreFunctions.getUserProfile(user.uid);
      if (profileData.error || !profileData.data) {
        await firestoreFunctions.createUserProfile(user.uid, {
          email: user.email,
          displayName: user.displayName || '',
          avatar: user.photoURL || '👤',
          bio: '',
          preferences: {},
          goals: [],
          interests: [],
          notificationSettings: {},
        });
      }

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await authFunctions.logout();
      if (error) return rejectWithValue(error);
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const { error } = await authFunctions.resetPassword(email);
      if (error) return rejectWithValue(error);
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Sign Up
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Sign In
    builder
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Sign In with Google
    builder
      .addCase(signInWithGoogleAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogleAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInWithGoogleAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Reset Password
    builder
      .addCase(resetPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
