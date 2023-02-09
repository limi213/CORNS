import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userId = sessionStorage.getItem("userId");

export const getIndicators = createAsyncThunk(
  "GET_INDICATORS",
  async (type) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/growth/indicator/${userId}/${type}`
      );

      return response.data;
    } catch (e) {
      console.log("알수없는 error", e);
    }
  }
);

export const indicatorsReducer = createSlice({
  name: "indicators",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIndicators.pending, (state) => void (state.loading = true))
      .addCase(getIndicators.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getIndicators.rejected, (state) => void (state.loading = true));
  },
});
