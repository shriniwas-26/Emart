// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

const initialState = {
  user: null,
  loading: false,
  error: null,
  profileUpdated: false,
};

// Define the base URL for the API
const API_URL = "/api/users";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async ({ jwt, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log(" user profile ", response.data);
      if (response.data.role === "ROLE_ADMIN") {
        navigate("/admin");
      }
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to fetch user profile");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (updateData, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      console.log("Updating user profile:", updateData);
      const response = await api.put(`${API_URL}/profile`, updateData, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Profile update successful:", response.data);
      return response.data;
    } catch (error) {
      console.log("Profile update error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.profileUpdated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.profileUpdated = true;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.profileUpdated = false;
      });
  },
});

export const { resetUserState, clearError } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => state.user.user;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
