import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    variantTheme: {
      type: 'light',
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
    setVariantTheme(state, action) {
      state.variantTheme.type = 'dark';
    },
  },
});

export const { setToast } = uiSlice.actions;

export default uiSlice.reducer;
