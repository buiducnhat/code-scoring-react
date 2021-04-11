import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authenApi } from './authenApi';

export const fetchLogin = createAsyncThunk(
  'authen/fetchLogin',
  ({ email, password }, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await authenApi.loginApi({ email, password });

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

export const fetchGetUserData = createAsyncThunk(
  'authen/fetchGetUserData',
  (params, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = localStorage.getItem('access-token');
        if (!accessToken) {
          return resolve(null);
        }

        const response = await authenApi.getUserDataApi({ accessToken });

        return resolve(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          return reject(rejectWithValue(error.response.data));
        }
        return reject(error);
      }
    });
  }
);

export const fetchRegister = createAsyncThunk(
  'authen/fetchRegister',
  ({ email, name, password }, { rejectWithValue }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await authenApi.registerApi({ email, name, password });

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

export const authenSlice = createSlice({
  name: 'authen',
  initialState: {
    isLoggedIn: false,
    userData: null,

    fetchLoginMsg: null,
    isPendingFetchLogin: false,

    fetchRegisterMsg: null,
    isPendingFetchRegister: false,

    fetchGetUserDataMsg: null,
    isPendingFetchGetUserData: false,
  },
  reducers: {
    logout(state) {
      state.fetchLoginMsg = null;
      state.fetchRegisterMsg = null;
      state.fetchGetUserDataMsg = null;
      state.userData = null;
      state.isLoggedIn = false;
      localStorage.removeItem('access-token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch GetUserData
      .addCase(fetchGetUserData.pending, (state) => {
        state.fetchGetUserDataMsg = null;
        state.isPendingFetchGetUserData = true;
      })
      .addCase(fetchGetUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.fetchGetUserDataMsg = null;
        state.isPendingFetchGetUserData = false;
      })
      .addCase(fetchGetUserData.rejected, (state, action) => {
        state.fetchGetUserDataMsg = action.payload?.message;
      })

      // Handle fetch Login
      .addCase(fetchLogin.pending, (state) => {
        state.isLoggedIn = false;
        state.isPendingFetchLogin = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isPendingFetchLogin = false;
        state.fetchLoginMsg = null;
        state.isLoggedIn = true;
        state.userData = { ...action.payload?.userData, accessToken: action.payload.accessToken };
        localStorage.setItem('access-token', action.payload.accessToken);
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isPendingFetchLogin = false;
        state.isLoggedIn = false;
        state.userData = null;
        state.fetchLoginMsg = action.payload?.message;
        localStorage.removeItem('access-token');
      })

      // Handle fetch register
      .addCase(fetchRegister.pending, (state) => {
        state.isLoggedIn = false;
        state.fetchRegisterMsg = null;
        state.isPendingFetchRegister = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isPendingFetchRegister = false;
        state.fetchRegisterMsg = null;
        state.isLoggedIn = true;
        state.userData = { ...action.payload?.userData, accessToken: action.payload.accessToken };
        localStorage.setItem('access-token', action.payload.accessToken);
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isPendingFetchRegister = false;
        state.isLoggedIn = false;
        state.userData = null;
        state.fetchRegisterMsg = action.payload?.message;
        localStorage.removeItem('access-token');
      });
  },
});

export const { logout } = authenSlice.actions;

export default authenSlice.reducer;
