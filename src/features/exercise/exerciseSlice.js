import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { exerciseApi } from './exerciseApi';

export const fetchListExercise = createAsyncThunk(
  'exercise/fetchListExercise',
  ({ page, pageSize, order, title }, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = localStorage.getItem('access-token');
        let response = await exerciseApi.listExercise({
          accessToken,
          page,
          pageSize,
          order,
          title,
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

export const fetchExerciseDetail = createAsyncThunk(
  'exercise/fetchExerciseDetail',
  ({ exerciseId }, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = localStorage.getItem('access-token');
        let response = await exerciseApi.getExerciseDetail({ accessToken, exerciseId });

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

export const fetchCreateExercise = createAsyncThunk(
  'exercise/fetchCreateExercise',
  ({ title, point, content, testCases, languages }, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = localStorage.getItem('access-token');
        let response = await exerciseApi.createExercise({
          accessToken,
          title,
          point,
          content,
          testCases,
          languages,
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

export const fetchUpdateExercise = createAsyncThunk(
  'exercise/fetchUpdateExercise',
  ({ exerciseId, title, point, content, testCases, languages, status }, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = localStorage.getItem('access-token');
        let response = await exerciseApi.updateExercise({
          accessToken,
          exerciseId,
          title,
          point,
          content,
          testCases,
          languages,
          status,
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

export const fetchUpdateExerciseStatus = createAsyncThunk(
  'exercise/fetchUpdateExerciseStatus',
  ({ exerciseId, status }, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = localStorage.getItem('access-token');
        let response = await exerciseApi.updateExerciseStatus({
          accessToken,
          exerciseId,
          status,
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

    fetchCreateExerciseMsg: null,
    isPendingFetchCreateExercise: false,

    fetchUpdateExerciseMsg: null,
    isPendingFetchUpdateExercise: false,

    fetchUpdateExerciseStatusMsg: null,
    isPendingFetchUpdateExerciseStatus: false,
  },
  reducers: {
    resetCurrentExercise(state) {
      state.currentExercise = {};
    },
    resetRunAndSubmit(state) {
      state.runResult = [];
      state.submittedResult = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch list exercise
      .addCase(fetchListExercise.pending, (state) => {
        state.fetchListExerciseMsg = null;
        state.isPendingFetchListExercise = true;
      })
      .addCase(fetchListExercise.fulfilled, (state, action) => {
        state.total = action.payload.total;
        state.exercises = action.payload.exercises;
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
      })

      // Handle fetch create new exercise
      .addCase(fetchCreateExercise.pending, (state) => {
        state.fetchCreateExerciseMsg = null;
        state.isPendingFetchCreateExercise = true;
      })
      .addCase(fetchCreateExercise.fulfilled, (state, action) => {
        state.currentExercise = action.payload;
        state.fetchCreateExerciseMsg = null;
        state.isPendingFetchCreateExercise = false;
      })
      .addCase(fetchCreateExercise.rejected, (state, action) => {
        state.fetchCreateExerciseMsg = action.payload?.message;
        state.isPendingFetchCreateExercise = false;
      })

      // Handle fetch update exercise status
      .addCase(fetchUpdateExercise.pending, (state) => {
        state.fetchUpdateExerciseMsg = null;
        state.isPendingFetchUpdateExercise = true;
      })
      .addCase(fetchUpdateExercise.fulfilled, (state, action) => {
        state.currentExercise = action.payload;
        state.fetchUpdateExerciseMsg = null;
        state.isPendingFetchUpdateExercise = false;
      })
      .addCase(fetchUpdateExercise.rejected, (state, action) => {
        state.fetchUpdateExerciseMsg = action.payload?.message;
        state.isPendingFetchUpdateExercise = false;
      });
  },
});

export const { resetCurrentExercise, resetRunAndSubmit } = exerciseSlice.actions;

export default exerciseSlice.reducer;
