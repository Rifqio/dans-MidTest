import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../lib/instance";

export const getMe = createAsyncThunk(
  "profile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user;
      const response = await instance.get("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
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
  profile: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.profile = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
      state.profile = [];
    });
  },
});

export default profileSlice.reducer;
