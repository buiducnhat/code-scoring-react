import { createSlice } from '@reduxjs/toolkit';

import { APP_THEME } from 'src/app/constants';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: {
      type: APP_THEME.light,
    },
    toast: {
      open: false,
      type: 'info',
      content: '',
      position: {
        vertical: 'top',
        horizontal: 'right',
      },
    },
  },
  reducers: {
    setToast(state, action) {
      state.toast = { ...action.payload };
    },
    setTheme(state, action) {
      state.theme = { ...action.payload };
    },
  },
});

export const { setToast, setTheme } = uiSlice.actions;

export default uiSlice.reducer;
