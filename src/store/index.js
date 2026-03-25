import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userProfileReducer from './slices/userProfileSlice';
import wellnessReducer from './slices/wellnessSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    wellness: wellnessReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser', 'auth/setError'],
        ignoredActionPaths: ['payload.user', 'payload.error'],
      },
    }),
});

export default store;
