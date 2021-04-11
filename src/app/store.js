import { configureStore } from '@reduxjs/toolkit';
import authenSlice from '../features/authen/authenSlice';

export const store = configureStore({
  reducer: {
    authenSlice,
  },
});
