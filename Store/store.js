import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userInteractionsReducer from './userInteractionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userInteractions: userInteractionsReducer,
  },
});
