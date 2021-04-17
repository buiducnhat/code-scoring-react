import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { exerciseApi } from './exerciseApi';

export const fetchListExercise = createAsyncThunk(
  'exercise/fetchListExercise',
  ({ page, pageSize, order, title }, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await exerciseApi.listExercise({ page, pageSize, order, title });

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

export const fetchExerciseDetail = createAsyncThunk(
  'exercise/fetchExerciseDetail',
  ({ exerciseId }, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await exerciseApi.getExerciseDetail({ exerciseId });

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

export const fetchSubmitExercise = createAsyncThunk(
  'exercise/fetchSubmitExercise',
  ({ exerciseId, scriptCode, languageId, codeFile }, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = localStorage.getItem('access-token');
        let response = await exerciseApi.submitExercise({
          accessToken,
          exerciseId,
          scriptCode,
          languageId,
          codeFile,
        });

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

export const fetchRunExercise = createAsyncThunk(
  'exercise/fetchRunExercise',
  ({ exerciseId, scriptCode, languageId, codeFile }, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = localStorage.getItem('access-token');
        let response = await exerciseApi.runExercise({
          accessToken,
          exerciseId,
          scriptCode,
          languageId,
          codeFile,
        });

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

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    exercises: [],
    currentExercise: {},
    total: 0,
    runResult: [],
    submittedResult: {},

    fetchListExerciseMsg: null,
    isPendingFetchListExercise: false,

    fetchExerciseDetailMsg: null,
    isPendingFetchExerciseDetail: false,

    fetchSubmitExerciseMsg: null,
    isPendingFetchSubmitExercise: false,

    fetchRunExerciseMsg: null,
    isPendingFetchRunExercise: false,
  },
  reducers: {
    logout(state) {},
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch list exercise
      .addCase(fetchListExercise.pending, (state) => {
        state.fetchListExerciseMsg = null;
        state.isPendingFetchListExercise = true;
      })
      .addCase(fetchListExercise.fulfilled, (state, action) => {
        state.exercises = action.payload;
        state.fetchListExerciseMsg = null;
        state.isPendingFetchListExercise = false;
      })
      .addCase(fetchListExercise.rejected, (state, action) => {
        state.fetchListExerciseMsg = action.payload?.message;
        state.isPendingFetchListExercise = false;
      })

      // Handle fetch Exercise detail
      .addCase(fetchExerciseDetail.pending, (state) => {
        state.fetchExerciseDetailMsg = null;
        state.isPendingFetchExerciseDetail = true;
      })
      .addCase(fetchExerciseDetail.fulfilled, (state, action) => {
        state.currentExercise = action.payload;
        state.fetchExerciseDetailMsg = null;
        state.isPendingFetchExerciseDetail = false;
      })
      .addCase(fetchExerciseDetail.rejected, (state, action) => {
        state.fetchExerciseDetailMsg = action.payload?.message;
        state.isPendingFetchExerciseDetail = false;
      })

      // Handle fetch Submit exercise
      .addCase(fetchSubmitExercise.pending, (state) => {
        state.fetchSubmitExerciseMsg = null;
        state.isPendingFetchSubmitExercise = true;
      })
      .addCase(fetchSubmitExercise.fulfilled, (state, action) => {
        state.submittedResult = action.payload;
        state.fetchSubmitExerciseMsg = null;
        state.isPendingFetchSubmitExercise = false;
      })
      .addCase(fetchSubmitExercise.rejected, (state, action) => {
        state.fetchSubmitExerciseMsg = action.payload?.message;
        state.isPendingFetchSubmitExercise = false;
      })

      // Handle fetch run exercise
      .addCase(fetchRunExercise.pending, (state) => {
        state.fetchRunExerciseMsg = null;
        state.isPendingFetchRunExercise = true;
      })
      .addCase(fetchRunExercise.fulfilled, (state, action) => {
        state.runResult = action.payload;
        state.fetchRunExerciseMsg = null;
        state.isPendingFetchRunExercise = false;
      })
      .addCase(fetchRunExercise.rejected, (state, action) => {
        state.fetchRunExerciseMsg = action.payload?.message;
        state.isPendingFetchRunExercise = false;
      });
  },
});

export const {} = exerciseSlice.actions;

export default exerciseSlice.reducer;
