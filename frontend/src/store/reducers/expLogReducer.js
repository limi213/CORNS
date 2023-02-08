import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userId = sessionStorage.getItem("userId");

export const getExpLog = createAsyncThunk("GET_EXP_LOG", async (pp) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/growth/exp/list/${userId}`,
      {
        params: pp,
      }
    );
    return response.data;
  } catch (e) {
    console.log("알수없는 error", e);
  }
});

export const expLogReducer = createSlice({
  name: "expLog",
  initialState: {
    data: {},
    loading: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExpLog.pending, (state) => void (state.loading = "pending"))
      .addCase(getExpLog.fulfilled, (state, action) => {
        state.loading = "successed";
        state.data = action.payload;
      })
      .addCase(getExpLog.rejected, (state) => void (state.loading = "failed"));
  },
});
