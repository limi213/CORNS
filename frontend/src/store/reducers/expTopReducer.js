import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userId = sessionStorage.getItem("userId");

export const getExpTop = createAsyncThunk("GET_EXP_TOP", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/growth/exp/${userId}`
    );
    return response.data;
  } catch (e) {
    console.log("알수없는 error", e);
  }
});

export const expTopReducer = createSlice({
  name: "expTop",
  initialState: {
    data: {},
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExpTop.pending, (state) => void (state.loading = true))
      .addCase(getExpTop.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getExpTop.rejected, (state) => void (state.loading = true));
  },
});
