import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRoomList = createAsyncThunk("GET_ROOM_LIST", async (filter) => {
  const response = await axios.get(`${process.env.REACT_APP_HOST}/room`, {
    params: filter,
  });
  return response.data.list;
});

export const roomListReducer = createSlice({
  name: "roomList",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomList.fulfilled, (state, { payload }) => [
      ...payload,
    ]);
  },
});
