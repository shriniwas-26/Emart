import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';
import { resetUserState } from './UserSlice';
import { resetCartState } from './CartSlice';

// Initial state
const initialState = {
  jwt: null,
  role: null,
  loading: false,
  error: null,
};

// Define the base URL for the API
const API_URL = '/auth';

// Async thunks
export const signup = createAsyncThunk(
  'auth/signup',
  async (signupRequest, { rejectWithValue }) => {
    console.log('signup', signupRequest);
    try {
      const response = await api.post(`${API_URL}/signup`, signupRequest);
      signupRequest.navigate('/');
      localStorage.setItem('jwt', response.data.jwt);
      return response.data;
    } catch (error) {
      console.log('Signup error:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/signin`, loginRequest);
      console.log('Login successful', response.data);
      localStorage.setItem('jwt', response.data.jwt);
      loginRequest.navigate('/');
      return response.data;
    } catch (error) {
      console.log('Login error:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Signin failed');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/reset-password`, resetPasswordRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue('Reset password failed');
    }
  }
);

export const resetPasswordRequest = createAsyncThunk(
  'auth/resetPasswordRequest',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/reset-password-request`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue('Reset password request failed');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.role = null;
      localStorage.clear();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.loading = false;
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordRequest.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPasswordRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

// Thunk for logout
export const performLogout = () => async (dispatch) => {
  dispatch(logout());
  dispatch(resetUserState());
  dispatch(resetCartState());
};

// Selectors
export const selectAuth = (state) => state.auth;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
