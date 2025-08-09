// src/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

const initialState = {
  wishlist: null,
  loading: false,
  error: null,
};

export const getWishlistByUserId = createAsyncThunk(
  "wishlist/getWishlistByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      console.log("getWishlistByUserId called with JWT:", jwt ? "exists" : "missing");
      
      if (!jwt) {
        console.log("No JWT token found, rejecting");
        return rejectWithValue("No authentication token available");
      }
      
      console.log("Making API call to /api/wishlist");
      const response = await api.get(`/api/wishlist`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("wishlist fetch successful:", response.data);
      return response.data;
    } catch (error) {
      console.log("wishlist fetch error:", error);
      console.log("error.response:", error.response);
      console.log("error.response?.data:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async ({ productId }, { rejectWithValue }) => {
    try {
      console.log("addProductToWishlist called with productId:", productId);
      const response = await api.post(
        `/api/wishlist/add-product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log(" add product successful:", response.data);
      return response.data;
    } catch (error) {
      console.log("addProductToWishlist error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product to wishlist"
      );
    }
  }
);

// Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // getWishlistByUserId
    builder.addCase(getWishlistByUserId.pending, (state) => {
      console.log("getWishlistByUserId.pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getWishlistByUserId.fulfilled,
      (state, action) => {
        console.log("getWishlistByUserId.fulfilled with payload:", action.payload);
        state.wishlist = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(getWishlistByUserId.rejected, (state, action) => {
      console.log("getWishlistByUserId.rejected with payload:", action.payload);
      state.loading = false;
      state.error = action.payload;
    });

    // addProductToWishlist
    builder.addCase(addProductToWishlist.pending, (state) => {
      console.log("addProductToWishlist.pending");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addProductToWishlist.fulfilled,
      (state, action) => {
        console.log("addProductToWishlist.fulfilled with payload:", action.payload);
        state.wishlist = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(addProductToWishlist.rejected, (state, action) => {
      console.log("addProductToWishlist.rejected with payload:", action.payload);
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetWishlistState } = wishlistSlice.actions;

export default wishlistSlice.reducer;
