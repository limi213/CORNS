import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRoomList = createAsyncThunk("GET_ROOM_LIST", async (filter) => {
  const response = await axios.get(`${process.env.REACT_APP_HOST}/room`, {
    params: filter,
  });
  return response.data;
});

export const roomListReducer = createSlice({
  name: "roomList",
  initialState: {
    data: {},
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomList.pending, (state) => void (state.loading = true))
      .addCase(getRoomList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getRoomList.rejected, (state) => void (state.loading = true));
  },
});
