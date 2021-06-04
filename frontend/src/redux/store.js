import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';
import searchReducer from './searchSlice';
import jobsReducer from './jobsSlice';
import applicationReducer from './applySlice';
import usersReducer from './userslice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    jobs: jobsReducer,
    application: applicationReducer,
    users: usersReducer,
  },
});
