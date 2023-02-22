import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../lib/instance";

export const getProducts = createAsyncThunk(
  "get/products",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user;
      const response = await instance.get("/api/data/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const products = await response.data.data.products;
      return products;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "get/product/:id",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user;
      const response = await instance.get(`/api/data/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const product = await response.data.data;
      console.log(product);
      return product;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  products: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
      state.products = {}
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export default productSlice.reducer;
