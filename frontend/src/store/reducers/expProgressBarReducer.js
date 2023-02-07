import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userId = sessionStorage.getItem("userId");

export const getExpProgressBar = createAsyncThunk(
  "GET_EXPPROGRESS_BAR",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/growth/exp/bar/${userId}`
      );
      return response.data;
    } catch (e) {
      console.log("알수없는error입니다.");
    }
  }
);

export const expProgressBarReducer = createSlice({
  name: "expProgressBar",
  initialState: {
    expTotal: 0,
    level: {
      levelNo: 0,
      startExp: 0,
      endExp: 0,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getExpProgressBar.fulfilled,
      (state, { payload }) => payload
    );
  },
});

// promise 때문에 가져와서 써보고 있는 것들

// initialState
// expTotal: 0,
// level: {
//   levelNo: 0,
//   startExp: 0,
//   endExp: 0,
// },

// .addCase(getExpProgressBar.fulfilled, (state, { payload }) => {
//   state.error = null;
//   state.loading = false;
//   state.data = { ...payload };
// })
// .addCase(getExpProgressBar.rejected, (state, { payload }) => {
//   state.error = payload;
//   state.loading = false;
//   state.data = null;
// });
