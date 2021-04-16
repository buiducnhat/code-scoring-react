import { configureStore } from '@reduxjs/toolkit';

import authenSlice from 'src/features/authen/authenSlice';
import exerciseSlice from 'src/features/exercise/exerciseSlice';

export const store = configureStore({
  reducer: {
    authenSlice,
    exerciseSlice,
  },
});
