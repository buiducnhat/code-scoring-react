import { configureStore } from '@reduxjs/toolkit';

import uiSlice from 'src/features/ui/uiSlice';
import authenSlice from 'src/features/authen/authenSlice';
import exerciseSlice from 'src/features/exercise/exerciseSlice';

export const store = configureStore({
  reducer: {
    uiSlice,
    authenSlice,
    exerciseSlice,
  },
});
