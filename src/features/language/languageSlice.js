import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { languageApi } from './languageApi';

export const fetchListLanguage = createAsyncThunk(
  'language/fetchListLanguage',
  (params, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await languageApi.getAll();

        return resolve(response.data);
      } catch (error) {
        if (error.response) {
          return reject(rejectWithValue(error.response.data));
        }
        return reject(error);
      }
    });
  }
);

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    languages: [],

    fetchListLanguageMsg: null,
    isPendingFetchListLanguage: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch list languages
      .addCase(fetchListLanguage.pending, (state) => {
        state.fetchListLanguageMsg = null;
        state.isPendingFetchListLanguage = true;
      })
      .addCase(fetchListLanguage.fulfilled, (state, action) => {
        state.languages = action.payload;
        state.fetchListLanguageMsg = null;
        state.isPendingFetchListLanguage = false;
      })
      .addCase(fetchListLanguage.rejected, (state, action) => {
        state.fetchListLanguageMsg = action.payload?.message;
        state.isPendingFetchListLanguage = false;
      });
  },
});

// export const { } = languageSlice.actions;

export default languageSlice.reducer;
