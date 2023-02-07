import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userId = sessionStorage.getItem("userId");

export const getAttendProgressBar = createAsyncThunk(
  "GET_ATTENDPROGRESS_BAR",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/growth/room/${userId}`
    );
    return response.data;
  }
);

export const attendProgressBarReducer = createSlice({
  name: "attendProgressBar",
  initialState: {
    attendanceRate: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAttendProgressBar.fulfilled,
      (state, { payload }) => payload
    );
  },
});
