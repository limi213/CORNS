import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRoomList = createAsyncThunk("GET_ROOM_LIST", async () => {
  const response = await axios.get(`${process.env.REACT_APP_HOST}/room`);
  return response.data.rooms;
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
